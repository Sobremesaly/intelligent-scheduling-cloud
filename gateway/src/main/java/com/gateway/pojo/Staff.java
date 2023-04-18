package com.gateway.pojo;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author 小叶子
 */
@TableName("staff")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Staff {
    @TableId(value = "staff_id")
    private String staffId;
    private String staffName;
    private String staffEmail;
    private String staffPassword;
    private String staffPosition;
    private String storeId;
    private long weekWorkHours;
}
