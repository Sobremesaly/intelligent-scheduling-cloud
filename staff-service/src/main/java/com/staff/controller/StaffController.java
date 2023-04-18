package com.staff.controller;

import com.staff.service.StaffService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @author 小叶子
 */
@Slf4j
@RestController
@RequestMapping(value = "/staff")
public class StaffController {
    @Resource
    private StaffService staffService;

    @GetMapping("/checkUserExist")
    String checkUserExist(@RequestParam("staffEmail") String staffEmail, @RequestParam("staffPassword") String staffPassword, @RequestParam("staffPosition") String staffPosition) {
        return staffService.checkUserExist(staffEmail, staffPassword, staffPosition);
    }

    @PostMapping("/findUserByEmail")
    String findUserByEmail(@RequestParam("staffEmail") String staffEmail) {
        System.out.println("email = " + staffEmail);
        return staffService.findUserByEmail(staffEmail);
    }

}
