package com.gateway.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

/**
 * @author 小叶子
 */
@Data
@TableName("user_info")
public class UserEntity implements UserDetails {
    @TableId(type = IdType.AUTO, value = "user_id")
    private String userId;
    private String userName;
    private String userEmail;
    private String userPassword;
    private String userPosition;
    private String storeId;
    @Getter(value = AccessLevel.NONE)
    private Boolean enabled = true;
    private Boolean locked = true;
    @TableField(exist = false)
    private List<GrantedAuthority> roles;

    public UserEntity(Staff staff) {
        this.userId = staff.getStaffId();
        this.userName = staff.getStaffName();
        this.userEmail = staff.getStaffEmail();
        this.userPassword = staff.getStaffPassword();
        this.userPosition = staff.getStaffPosition();
        this.storeId = staff.getStoreId();
    }

    public UserEntity() {

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public String getPassword() {
        return userPassword;
    }

    @Override
    public String getUsername() {
        return userEmail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
