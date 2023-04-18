package com.staff.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * @author 小叶子
 */
@TableName("user_info")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @TableId(type = IdType.AUTO, value = "user_id")
    private Long userId;
    private String userName;
    private String userEmail;
    private String userPassword;
    private Integer userIdentity;
    private Long storeId;
}
