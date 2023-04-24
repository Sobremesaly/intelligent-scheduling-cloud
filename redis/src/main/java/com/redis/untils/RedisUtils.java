package com.redis.untils;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.concurrent.TimeUnit;

/**
 * redis的常用操作封装一下
 * @author 小叶子
 */
@Component
public class RedisUtils {

    /*默认过期时间为30分钟*/
    private static final long DEFAULT_EXPIRE_MINUTES = 30L;

    @Resource
    private RedisTemplate<String, Object> redisTemplate;

    /**
     * 获取值
     * @param key 键值
     * @return 相应键值的json串
     */
    public Object get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    /**
     * 设置30分钟后过期
     * @param key 键值
     * @param value 键对应的json
     */
    public void set(String key, Object value) {
        redisTemplate.opsForValue().set(key, value, DEFAULT_EXPIRE_MINUTES, TimeUnit.MINUTES);
    }
    /**
     * 按照分钟单位设置默认过期时间
     * @param key 键值
     * @param value 对应值
     * @param expireTime 过期时间
     */
    public void set(String key, Object value, long expireTime) {
        redisTemplate.opsForValue().set(key, value, expireTime, TimeUnit.MINUTES);
    }



    /**
     * 设置过期时间
     * @param key 键值
     * @param seconds 设置过期时间
     */
    public void expire(String key, long seconds) {
        redisTemplate.expire(key, seconds, TimeUnit.SECONDS);
    }

    /**
     * 删除key
     * @param key 键值
     */
    public void delete(String key) {
        redisTemplate.delete(key);
    }

    /**
     * 分布式锁
     * @param key 键值
     * @param expireSeconds 上锁时间
     * @return 上锁结果
     */
    public boolean lock(String key, long expireSeconds) {
        Boolean result = redisTemplate.opsForValue().setIfAbsent(key, "");
        if (result != null && result) {
            redisTemplate.expire(key, expireSeconds, TimeUnit.SECONDS);
            return true;
        }
        return false;
    }

    /**
     * 释放分布式锁
     * @param key 键值
     */
    public void unlock(String key) {
        redisTemplate.delete(key);
    }
}


