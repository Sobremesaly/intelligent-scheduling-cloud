package com.gateway.Handler;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.ReactiveAuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.server.authorization.AuthorizationContext;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * 判断用户是否有权访问
 * @author 小叶子
 */
@Component
public class AuthManagerHandler implements ReactiveAuthorizationManager<AuthorizationContext> {

    private final AntPathMatcher antPathMatcher = new AntPathMatcher();

    /**
     * 管理者允许访问的路径
     */
    private final List<String> ADMIN_ALLOW = Arrays.asList("admin/login","admin/test");

    private final List<String> USER_ALLOW = Arrays.asList("common/test","common/logout");

    @Override
    public Mono<AuthorizationDecision> check(Mono<Authentication> authentication, AuthorizationContext object) {
        ServerHttpRequest request = object.getExchange().getRequest();
        String requestUrl = request.getPath().pathWithinApplication().value();
        List<String> roles = new ArrayList<>();
        ADMIN_ALLOW.forEach(mate -> {
            if (antPathMatcher.match(mate, requestUrl)) {
                roles.addAll(Collections.singleton(mate));
            }
        });
        USER_ALLOW.forEach(mate -> {
            if (antPathMatcher.match(mate, requestUrl)) {
                roles.addAll(Collections.singleton(mate));
            }
        });
        if (roles.isEmpty()) {
            return Mono.just(new AuthorizationDecision(false));
        }
        return authentication
                .filter(Authentication::isAuthenticated)
                .flatMapIterable(Authentication::getAuthorities)
                .map(GrantedAuthority::getAuthority)
                .any(c -> roles.contains(String.valueOf(c)))
                .map(AuthorizationDecision::new)
                .defaultIfEmpty(new AuthorizationDecision(false));
    }

    @Override
    public Mono<Void> verify(Mono<Authentication> authentication, AuthorizationContext object) {
        return null;
    }
}
