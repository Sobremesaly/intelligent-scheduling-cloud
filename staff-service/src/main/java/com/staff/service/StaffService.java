package com.staff.service;

/**
 * @author 小叶子
 */

public interface StaffService {
    /**
     * 根据用户的邮箱号，密码，和身份去校验是否存在该用户
     * @param email    邮箱地址，可作为登录名
     * @param password 账号密码
     * @param identity 身份标识
     * @return 返回用户实体
     */
    String checkUserExist(String email, String password, String identity);

    /**
     * 根据邮箱作为的登录名查看用户是否存在
     *
     * @param email 邮箱
     * @return 返回序列化后包含对象的json
     */
    String findUserByEmail(String email);

    /**
     * 获取所有的用户信息
     * @return 包含所有信息的json序列
     */
    String getAllStaff();
}
