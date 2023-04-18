package com.feign.config;
import feign.Logger;
import org.springframework.context.annotation.Bean;

/**
 * @author 小叶子
 */
public class DefaultFeignConfiguration {
    @Bean
    public Logger.Level logLevel(){
        return Logger.Level.BASIC;
    }

}
