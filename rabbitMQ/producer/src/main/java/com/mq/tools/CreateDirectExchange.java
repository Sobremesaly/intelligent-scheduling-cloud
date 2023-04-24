package com.mq.tools;

import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * @author 小叶子
 */
@Component
public class CreateDirectExchange {

    @Resource
    private RabbitAdmin rabbitAdmin;

    public DirectExchange directExchange(String directExchangeName){
        DirectExchange directExchange = new DirectExchange(directExchangeName);
        rabbitAdmin.declareExchange(directExchange);
        return directExchange;
    }
}
