package com.mq.tools;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * @author 小叶子
 */
@Component
public class CreateMessageQueue {

    @Resource
    private RabbitAdmin rabbitAdmin;

    /**
     * 按名创建默认消息队列
     * @param queueName 队列名
     * @return 创建完成的队列，交给调用方注入
     */
    public Queue createMessageQueue(String queueName) {
        Queue queue = new Queue(queueName, true, false, false);
        rabbitAdmin.declareQueue(queue);
        return queue;
    }
}
