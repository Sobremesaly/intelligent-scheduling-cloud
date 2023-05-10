package com.gateway;

import com.feign.clients.StaffClient;
import com.feign.config.DefaultFeignConfiguration;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;

import java.util.stream.Collectors;

/**
 * @author 小叶子
 */
@SpringBootApplication
@EnableWebFluxSecurity
@EnableFeignClients(clients = StaffClient.class, defaultConfiguration = DefaultFeignConfiguration.class)
public class GatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }

    @Bean
    @ConditionalOnMissingBean
    public HttpMessageConverters messageConverters(ObjectProvider<HttpMessageConverter<?>> converters) {
        return new HttpMessageConverters(converters.orderedStream().collect(Collectors.toList()));
    }
}


