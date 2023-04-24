package com.mq.tools;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * @author 小叶子
 */
@Component
public class DirectBindingQueue {

    @Resource
    private RabbitAdmin rabbitAdmin;

    public Binding directBindingQueue(Queue queue, DirectExchange directExchange, String routingKey) {
        Binding builder = BindingBuilder.bind(queue).to(directExchange).with(routingKey);
        rabbitAdmin.declareBinding(builder);
        return builder;
    }
}
