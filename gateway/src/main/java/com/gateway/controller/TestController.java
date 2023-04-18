package com.gateway.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author 小叶子
 */
@RestController
public class TestController {
    @GetMapping("/admin/test")
    public String adminTest() {
        return "success : /admin/test ";
    }

    @GetMapping("/common/test")
    public String commonTest() {
        System.out.println("test success!");
        return "success : /common/test";
    }
}

