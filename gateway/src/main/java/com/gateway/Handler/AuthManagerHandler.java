package com.gateway.Handler;

import com.gateway.util.JwtTool;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.ReactiveAuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.server.authorization.AuthorizationContext;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import reactor.core.publisher.Mono;
import javax.annotation.Resource;
import java.util.*;

/**
 * 判断用户是否有权访问
 *
 * @author 小叶子
 */
@Component
@Slf4j
public class AuthManagerHandler implements ReactiveAuthorizationManager<AuthorizationContext> {

    @Resource
    JwtTool jwtTool;

    private final AntPathMatcher antPathMatcher = new AntPathMatcher();

    /**
     * 管理者允许访问的路径
     */
    private final List<String> MANAGER_ALLOW = Arrays.asList("/staff/getStaffInformation", "/staff/getAllStaff");

    private final List<String> COMMON_ALLOW = Arrays.asList("/staff/getStaffInformation", "");

    @Override
    public Mono<AuthorizationDecision> check(Mono<Authentication> authentication, AuthorizationContext object) {
        /*获取一下请求中的信息*/
        ServerHttpRequest request = object.getExchange().getRequest();
        String requestUrl = request.getPath().pathWithinApplication().value();
        String token = request.getHeaders().getFirst("token");
        /*解析token中保存的信息*/
        List<String> roles = jwtTool.getUserRoles(token);
        /*如果这个人都不具有权限直接拦截*/
        if (roles.isEmpty()) {
            return Mono.just(new AuthorizationDecision(false));
        }
        String manager = "manager";
        String common = "common";
        List<String> matchResult = new ArrayList<>(1);
        /*遍历判断该用户是否具有这个请求权限*/
        if (roles.contains(manager)) {
            MANAGER_ALLOW.forEach(mate -> {
                if (antPathMatcher.match(mate, requestUrl)) {
                    matchResult.addAll(Collections.singleton(mate));
                }
            });
        } else if (roles.contains(common)) {
            COMMON_ALLOW.forEach(mate -> {
                if (antPathMatcher.match(mate, requestUrl)) {
                    matchResult.addAll(Collections.singleton(mate));
                }
            });
        }
        /*如果请求路径和权限不符合就拒绝访问*/
        if (matchResult.isEmpty()) {
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
