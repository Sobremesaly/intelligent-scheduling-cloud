package com.gateway.config;

import com.gateway.Handler.*;
import com.gateway.filter.RequestFilter;
import com.gateway.filter.ResponseFilter;
import com.gateway.service.impl.UserDetailsServiceImpl;
import com.google.common.collect.ImmutableList;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UserDetailsRepositoryReactiveAuthenticationManager;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.annotation.Resource;

/**
 * security基本配置类
 * spring security的bean加载是限于spring的
 * 必须要用@Lazy懒加载，或者使用构造器注入
 *
 * @author 小叶子
 */
@Configuration
@EnableWebFluxSecurity
@Lazy
public class SecurityConfig {

    @Resource
    private RequestFilter requestFilter;

    @Resource
    private ResponseFilter responseFilter;

    @Resource
    private AccessDeniedHandler accessDeniedHandler;

    @Resource
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @Resource
    private AuthManagerHandler authManagerHandler;

    @Resource
    private LoginSuccessHandler loginSuccessHandler;

    @Resource
    private LoginFailedHandler loginFailedHandler;

    @Resource
    private LoginLoseHandler loginLoseHandler;

    @Resource
    private JwtSecurityContextRepository jwtSecurityContextRepository;

    /**
     * security的鉴权排除列表
     */
    private static final String[] EXCLUDED_AUTH_PAGES = {
            "/login",
            "/logout",
    };



    @Bean
    public ReactiveAuthenticationManager authenticationManager() {
        UserDetailsRepositoryReactiveAuthenticationManager authenticationManager = new UserDetailsRepositoryReactiveAuthenticationManager(userDetailsServiceImpl);
        authenticationManager.setPasswordEncoder(passwordEncoder());
        return authenticationManager;
    }

    /**
     * 修改加密格式
     *
     * @return 加密格式改为BCryptPasswordEncoder
     */
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

   /**
     * 允许跨域请求
     *
     * @return 把配置注入到容器
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(ImmutableList.of("*"));
        configuration.setAllowedMethods(ImmutableList.of("*"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(ImmutableList.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }



    @Bean
    SecurityWebFilterChain webFluxSecurityFilterChain(ServerHttpSecurity http) {
        http.authorizeExchange()
                .pathMatchers(EXCLUDED_AUTH_PAGES).permitAll()
                .pathMatchers(HttpMethod.OPTIONS).permitAll()
                .pathMatchers("/**").access(authManagerHandler)
                .anyExchange().authenticated()
                .and()
                .formLogin()
                .loginPage("/login")
                .authenticationManager(authenticationManager())
                .authenticationSuccessHandler(loginSuccessHandler)
                .authenticationFailureHandler(loginFailedHandler)
                .and().exceptionHandling().authenticationEntryPoint(loginLoseHandler)
                .and().exceptionHandling().accessDeniedHandler(accessDeniedHandler)
                .and()
                .addFilterAt(requestFilter, SecurityWebFiltersOrder.FIRST)
                .addFilterAt(responseFilter, SecurityWebFiltersOrder.LAST)
                .securityContextRepository(jwtSecurityContextRepository)
                .cors().disable().csrf().disable();
        return http.build();
    }


}
