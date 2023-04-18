package com.staff;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * @author 小叶子
 */
@MapperScan("com.staff.mapper")
@SpringBootApplication
@EnableDiscoveryClient
public class StaffApplication {
    public static void main(String[] args) {
        SpringApplication.run(StaffApplication.class, args);
    }
}
