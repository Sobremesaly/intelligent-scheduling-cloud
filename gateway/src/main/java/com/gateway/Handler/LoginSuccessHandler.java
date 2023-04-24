package com.gateway.Handler;

import com.alibaba.fastjson.JSONObject;
import com.gateway.pojo.UserEntity;
import com.gateway.util.JwtTool;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.server.WebFilterExchange;
import org.springframework.security.web.server.authentication.ServerAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.netty.ByteBufFlux;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 用户登录成功处理器
 * @author 小叶子
 */
@Component
public class LoginSuccessHandler implements ServerAuthenticationSuccessHandler {

    @Resource
    JwtTool jwtTool;

    @Override
    public Mono<Void> onAuthenticationSuccess(WebFilterExchange webFilterExchange, Authentication authentication) {
        UserEntity user = (UserEntity) authentication.getPrincipal();
        String username = user.getUsername();
        List<GrantedAuthority> authorities = (List<GrantedAuthority>) user.getAuthorities();
        List<String> roles = authorities.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        String token = jwtTool.createToken(String.valueOf(user.getUsername()), username, roles);
        JSONObject params = new JSONObject();
        params.put("code", 200);
        params.put("msg", "登陆成功！");
        params.put("username", username);
        params.put("role", roles);
        params.put("token", token);
        ServerWebExchange exchange = webFilterExchange.getExchange();
        ServerHttpResponse response = exchange.getResponse();
        response.getHeaders().setContentType(MediaType.APPLICATION_JSON);
        Mono<Void> ret = null;
        try {
            ret = response.writeAndFlushWith(Flux.just(ByteBufFlux.just(response.bufferFactory().wrap(params.toJSONString().getBytes("UTF-8")))));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return ret;
    }
}
