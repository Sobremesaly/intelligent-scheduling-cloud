package com.gateway.filter;
import com.gateway.util.JwtTool;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;
import javax.annotation.Resource;
import java.util.List;
import java.util.Objects;

/**
 * 自定义过滤器
 * @author 小叶子
 */
@Component
public class ResponseFilter implements WebFilter {
    @Resource
    private JwtTool jwtTool;

    @Override
    @SuppressWarnings("NullableProblems")
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        /*获取一下请求和响应*/
        ServerHttpRequest request = exchange.getRequest();
        ServerHttpResponse response = exchange.getResponse();
        String loginPath = "/login";
        int successStatus = 200;
        /*如果是登录或者状态码不正常就不要去执行下面的代码段*/
        if(Objects.requireNonNull(response.getStatusCode()).value() != successStatus || loginPath.contains(request.getPath().value())) {
            return chain.filter(exchange);
        }
        String token = request.getHeaders().getFirst("token");
        /*获取当前系统时间*/
        long now = System.currentTimeMillis() / 1000;
        String expiration = "exp";
        long time = Long.parseLong(jwtTool.getClaims(token, expiration));
        /*需要向请求头里添加信息告诉前端你的token快过期了，然后把新的放入*/
        HttpHeaders header = response.getHeaders();
        /*当token还有五分钟就过期了就更新一下*/
        int minute = 60;
        int threshold = 5;
        if((time - now) / minute < threshold) {
            /*从旧的token获取信息，更新token*/
            String userid = jwtTool.getUserid(token);
            String username = jwtTool.getUserid(token);
            List<String> roles = jwtTool.getUserRoles(token);
            String newToken = jwtTool.createToken(userid, username, roles);
            header.add("newToken", newToken);
        }
        return chain.filter(exchange);
    }
}
