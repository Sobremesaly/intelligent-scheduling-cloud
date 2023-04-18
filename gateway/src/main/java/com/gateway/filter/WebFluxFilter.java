package com.gateway.filter;

import com.alibaba.cloud.commons.lang.StringUtils;
import com.alibaba.fastjson.JSONObject;
import com.gateway.util.JwtTool;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;
import javax.annotation.Resource;

/**
 * 自定义过滤器
 * @author 小叶子
 */
@Slf4j
@Component
public class WebFluxFilter implements WebFilter {
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
            JSONObject jsonObject = setResultErrorMsg(401,"还没登录");
            DataBuffer buffer = response.bufferFactory().wrap(jsonObject.toJSONString().getBytes());
            /*封装成响应去反馈*/
            return response.writeWith(Mono.just(buffer));
        }
        boolean isTrue = jwtTool.verityToken(token);
        /*验证token是否合法*/
        if (!isTrue) {
            JSONObject jsonObject = setResultErrorMsg(402,"未经授权的token");
            DataBuffer buffer = response.bufferFactory().wrap(jsonObject.toJSONString().getBytes());
            return response.writeWith(Mono.just(buffer));
        }
        String username = jwtTool.getUserName(token);
        if (StringUtils.isEmpty(username)) {
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
