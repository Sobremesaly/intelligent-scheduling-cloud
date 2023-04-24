package com.mq.publisher;
import com.redis.untils.RedisUtils;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import javax.annotation.Resource;

/**
 * @author 小叶子
 */

@RestController
@RequestMapping("/staff")
public class StaffController {
    @Resource
    private RabbitTemplate rabbitTemplate;

    @Resource
    private RedisUtils redisUtils;

    @RequestMapping("/getStaffInformation")
    public String getStaffInformation(@RequestParam("staffEmail") String staffEmail) {
        /*如果redis中不为空直接返回就好了*/
        if(redisUtils.get(staffEmail) != null) {
            return redisUtils.get(staffEmail).toString();
        }
        return (rabbitTemplate.convertSendAndReceiveAsType("staff.direct", "query", staffEmail, new ParameterizedTypeReference<>() {}));
    }
}
