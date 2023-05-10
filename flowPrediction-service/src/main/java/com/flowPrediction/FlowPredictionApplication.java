package com.flowPrediction;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * @author 小叶子
 */
@MapperScan("com.flowPrediction.mapper")
@SpringBootApplication
@EnableDiscoveryClient
public class FlowPredictionApplication {
    public static void main(String[] args) {
        SpringApplication.run(FlowPredictionApplication.class, args);
    }
}
