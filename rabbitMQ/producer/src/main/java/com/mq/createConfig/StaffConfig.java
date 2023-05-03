package com.mq.createConfig;

import com.mq.tools.CreateDirectExchange;
import com.mq.tools.CreateMessageQueue;
import com.mq.tools.DirectBindingQueue;
import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;


/**
 * 在此完成专属消息队列和交换机的创建和绑定
 *
 * @author 小叶子
 */
@Component
public class StaffConfig {

    @Resource
    private CreateMessageQueue createMessageQueue;

    @Resource
    private CreateDirectExchange createDirectExchange;

    @Resource
    private DirectBindingQueue directBindingQueue;

    /**
     * 创建一个处理获取个人信息的请求的消息队列
     *
     * @return 创建完成的消息队列注入bean
     */
    @Bean
    public Queue queryQueue() {
        return createMessageQueue.createMessageQueue("staff.queue.query");
    }

    @Bean
    public Binding queryBinding(Queue queryQueue, DirectExchange directExchange) {
        return directBindingQueue.directBindingQueue(queryQueue, directExchange, "query");
    }

    /**
     * 创建一个处理获取所有人信息的请求的消息队列
     *
     * @return 创建完成的消息队列注入bean
     */
    @Bean
    public Queue allQueue() {
        return createMessageQueue.createMessageQueue("staff.queue.all");
    }

    @Bean
    public Binding allBinding(Queue allQueue, DirectExchange testDirectExchange) {
        return directBindingQueue.directBindingQueue(allQueue, testDirectExchange, "all");
    }


    @Bean
    public DirectExchange queryDirectExchange() {
        return createDirectExchange.directExchange("staff.direct");
    }

}
