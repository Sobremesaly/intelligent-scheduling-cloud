package com.staff.service.impl;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.staff.mapper.StaffMapper;
import com.staff.pojo.Staff;
import org.springframework.stereotype.Service;
import com.staff.service.StaffService;
import javax.annotation.Resource;
import java.util.HashMap;

/**
 * @author 小叶子
 */
@Service
public class StaffServiceImpl implements StaffService {
    @Resource
    private StaffMapper staffMapper;

    @Override
    public String checkUserExist(String email, String password, String identity) {
        HashMap<String, Object> map = new HashMap<>(2);
        try {
            QueryWrapper<Staff> wrapper = new QueryWrapper<>();
            wrapper.eq("staff_email", email)
                    .eq("staff_password", password);
            Staff staff = staffMapper.selectOne(wrapper);
            map.put("result", staff);
            map.put("flag", "right");
        } catch (Exception e) {
            map.put("flag", "error");
        }
        return JSON.toJSONString(map);
    }

    @Override
    public String findUserByEmail(String email) {
        HashMap<String, Object> map = new HashMap<>(2);
        try {
            QueryWrapper<Staff> wrapper = new QueryWrapper<>();
            wrapper.eq("staff_email", email);
            Staff staff = staffMapper.selectOne(wrapper);
            map.put("result", staff);
            map.put("flag", "right");
        } catch (Exception e) {
            map.put("flag", "error");
        }
        return JSON.toJSONString(map);
    }
}
