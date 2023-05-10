package com.gateway.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Data;
import org.springframework.stereotype.Component;
import java.util.Date;
import java.util.List;

/**
 * 封装Jwt的操作
 * @author 小叶子
 */
@Data
@Component
public class JwtTool {
    private String key = "com.bxc";
    private long overtime = 1000 * 60 * 60;

    public String createToken(String userid, String username, List<String> roles) {
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        JwtBuilder builder = Jwts.builder()
                .setId(userid)
                .setSubject(username)
                .setIssuedAt(now)
                .signWith(SignatureAlgorithm.HS256, key)
                .claim("roles", roles);
        if (overtime > 0) {
            builder.setExpiration(new Date(nowMillis + overtime));
        }
        return builder.compact();
    }

    public boolean verityToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(key)
                    .parseClaimsJws(token)
                    .getBody();
            if (claims != null) {
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public String getUserid(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(key)
                    .parseClaimsJws(token)
                    .getBody();
            if (claims != null) {
                return claims.getId();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public String getUserName(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(key)
                    .parseClaimsJws(token)
                    .getBody();
            if (claims != null) {
                return claims.getSubject();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<String> getUserRoles(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(key)
                    .parseClaimsJws(token)
                    .getBody();
            if (claims != null) {
                return (List<String>) claims.get("roles");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public String getClaims(String token, String param) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(key)
                    .parseClaimsJws(token)
                    .getBody();
            if (claims != null) {
                return claims.get(param).toString();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
