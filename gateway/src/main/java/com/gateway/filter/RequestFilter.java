package com.gateway.filter;
import com.alibaba.cloud.commons.lang.StringUtils;
import com.alibaba.fastjson.JSONObject;
import com.gateway.util.JwtTool;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import javax.annotation.Resource;

/**
 * 响应拦截器，主要作用是更新一下token信息
 * @author 小叶子
 */
@Component
public class RequestFilter implements WebFilter {
    @Resource
    private JwtTool jwtTool;

    @Override
    @SuppressWarnings("NullableProblems")
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        /*获取请求和响应*/
        ServerHttpRequest request = exchange.getRequest();
        ServerHttpResponse response = exchange.getResponse();
        /*获取请求头信息*/
        HttpHeaders header = response.getHeaders();
        header.add("Content-Type", "application/json; charset=UTF-8");
        /*获取请求路径*/
        String path = request.getPath().value();
        /*如果请求路径是登录，那么直接放行*/
        String allowedPath = "/login";
        if (path.contains(allowedPath)){
            return chain.filter(exchange);
        }
        String token = exchange.getRequest().getHeaders().getFirst("token");
        /*没有携带token判定为未登录状态*/
        if (StringUtils.isBlank(token)) {
            response.setStatusCode(HttpStatus.valueOf(401));
            JSONObject jsonObject = setResultErrorMsg(401,"还没登录");
            DataBuffer buffer = response.bufferFactory().wrap(jsonObject.toJSONString().getBytes());
            /*封装成响应去反馈*/
            return response.writeWith(Mono.just(buffer));
        }
        boolean isTrue = jwtTool.verityToken(token);
        /*验证token是否合法*/
        if (!isTrue) {
            response.setStatusCode(HttpStatus.valueOf(402));
            JSONObject jsonObject = setResultErrorMsg(402,"未经授权的token");
            DataBuffer buffer = response.bufferFactory().wrap(jsonObject.toJSONString().getBytes());
            return response.writeWith(Mono.just(buffer));
        }
        String username = jwtTool.getUserName(token);
        if (StringUtils.isEmpty(username)) {
            response.setStatusCode(HttpStatus.valueOf(403));
            JSONObject jsonObject = setResultErrorMsg(403,"不存在该用户");
            DataBuffer buffer = response.bufferFactory().wrap(jsonObject.toJSONString().getBytes());
            return response.writeWith(Mono.just(buffer));
        }
        return chain.filter(exchange);
    }

    private JSONObject setResultErrorMsg(Integer code,String msg) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("code", code);
        jsonObject.put("message", msg);
        return jsonObject;
    }

}
