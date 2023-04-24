package com.gateway.Handler;

import com.alibaba.cloud.commons.lang.StringUtils;
import com.gateway.pojo.*;
import com.gateway.util.JwtTool;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.web.server.context.ServerSecurityContextRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;


/**
 * @author 小叶子
 */
@Slf4j
@Component
public class JwtSecurityContextRepository implements ServerSecurityContextRepository  {

    @Resource
    JwtTool jwtTool;

    @Override
    public Mono<Void> save(ServerWebExchange exchange, SecurityContext context) {
        return Mono.empty();
    }

    @Override
    public Mono<SecurityContext> load(ServerWebExchange exchange) {
        String path = exchange.getRequest().getPath().toString();
        /*过滤路径*/
        String defaultPath = "/login";
        if (defaultPath.equals(path)) {
            return Mono.empty();
        }
        String token = exchange.getRequest().getHeaders().getFirst("token");
        if (StringUtils.isBlank(token)) {
            return Mono.error(new AuthenticationCredentialsNotFoundException("未认证请求"));
        }
        boolean isTrue = jwtTool.verityToken(token);
        if (!isTrue) {
            return Mono.error(new AuthenticationCredentialsNotFoundException("未经授权的token"));
        }
        String username = jwtTool.getUserName(token);
        if (StringUtils.isEmpty(username)) {
            return Mono.error(new AuthenticationCredentialsNotFoundException("不存在的用户"));
        }
        Authentication newAuthentication = new UsernamePasswordAuthenticationToken(username, username);
        return Mono.fromCallable(() -> {
            List<String> roles = jwtTool.getUserRoles(token);
            List<GrantedAuthority> authorities = roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
            UserEntity principal = new UserEntity();
            principal.setUserEmail(username);
            return new UsernamePasswordAuthenticationToken(principal, null, authorities);
        }).map(SecurityContextImpl::new);
    }

}