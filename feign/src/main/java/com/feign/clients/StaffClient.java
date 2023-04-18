package com.feign.clients;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @author 小叶子
 */
@FeignClient(name = "staff-service")
public interface StaffClient {
    /**
     * 根据用户的邮箱号，密码，和身份去校验是否存在该用户
     * @param staffEmail 邮箱地址，可作为登录名
     * @param staffPassword 账号密码
     * @param staffPosition 身份标识
     * @return 返回用户实体
     */
    @GetMapping("/staff/checkUserExist")
    String checkUserExist(@RequestParam("staffEmail") String staffEmail, @RequestParam("staffPassword") String staffPassword, @RequestParam("staffPosition") String staffPosition);

    /**
     * 根据邮箱作为的登录名查看用户是否存在
     * @param staffEmail 邮箱
     * @return 返回序列化后包含对象的json
     */
    @PostMapping("staff/findUserByEmail")
    String findUserByEmail(@RequestParam("staffEmail") String staffEmail);
}
