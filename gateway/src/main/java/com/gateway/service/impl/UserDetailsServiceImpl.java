package com.gateway.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.feign.clients.StaffClient;
import com.gateway.pojo.UserEntity;
import com.gateway.pojo.Staff;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * 用户信息查找等实现
 * @author 小叶子
 */
@Service
public class UserDetailsServiceImpl implements ReactiveUserDetailsService {

    @Resource
    private StaffClient staffClient;

    @Override
    public Mono<UserDetails> findByUsername(String username) {
        return Mono.fromCallable(()->{
            ConcurrentHashMap<String, Object> map = JSONObject.parseObject(staffClient.findUserByEmail(username), new TypeReference<ConcurrentHashMap<String, Object>>() {
            });
            /*查询实体对象的键统一采用result*/
            String result = "result";
            if (Objects.isNull(map.get(result))) {
                throw new UsernameNotFoundException("用户不存在!");
            }
            /*因为传过来的HashMap包含了不同的类型，先转成map然后解析这个json成对象*/
            Staff staff = JSON.parseObject(JSON.toJSONString(map.get(result)), Staff.class);
            List<String> list = new ArrayList<>();
            /*通过不同的身份分配不同的权限，本应该在数据库中建表的*/
            String manager = "manager";
            if(staff.getStaffPosition().equals(manager)) {
                list.add("manager");
            }
            else {
                list.add("common");
            }
            UserEntity userEntity = new UserEntity(staff);
            /*通过流去进行转换，其实SimpleGrantedAuthority类型也是字符串*/
            List<GrantedAuthority> authorities = list
                    .stream()
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());
            userEntity.setRoles(authorities);
            return userEntity;
        });
    }
}
