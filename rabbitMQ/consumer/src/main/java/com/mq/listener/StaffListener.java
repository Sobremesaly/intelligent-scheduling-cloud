package com.mq.listener;
import com.alibaba.fastjson2.JSON;
import com.feign.clients.StaffClient;
import com.feign.config.DefaultFeignConfiguration;
import com.redis.untils.RedisUtils;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.stereotype.Component;
import javax.annotation.Resource;
import java.util.HashMap;

/**
 * @author 小叶子
 */

@Component
@EnableFeignClients(clients = StaffClient.class, defaultConfiguration = DefaultFeignConfiguration.class)
public class StaffListener {
    @Resource
    private StaffClient staffClient;

    @Resource
    private RedisUtils redisUtils;

    @RabbitListener(queues = "staff.queue.all")
        public String getAllStaff() {
        String allStaffKey = "allStaff";
        redisUtils.set(allStaffKey, staffClient.getAllStaff());
        return staffClient.getAllStaff();
    }

    @RabbitListener(queues = "staff.queue.query")
    public String getStaffInformation(String staffEmail) {
        /*因为redis中没有所以要写入*/
        redisUtils.set(staffEmail, staffClient.findUserByEmail(staffEmail));
        return staffClient.findUserByEmail(staffEmail);
    }

    @RabbitListener(queues = "staff.queue.test")
    public String getTest() {
        System.err.println("I get the message");
        HashMap<String, Object> map = new HashMap<>(1);
        map.put("ok", true);
        return JSON.toJSONString(map);
    }
}
