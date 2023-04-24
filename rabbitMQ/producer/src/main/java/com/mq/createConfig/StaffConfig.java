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

    @Bean
    public Queue tryTest() {
        return createMessageQueue.createMessageQueue("staff.queue.test");
    }

    @Bean
    public DirectExchange testDirect() {
        return createDirectExchange.directExchange("test.direct");
    }

    @Bean
    public Binding testBind(Queue tryTest, DirectExchange testDirect) {
        return directBindingQueue.directBindingQueue(tryTest,testDirect,"test");
    }

    @Bean
    public Queue testQueue() {
        return createMessageQueue.createMessageQueue("staff.queue.query");
    }

    @Bean
    public DirectExchange testDirectExchange() {
        return createDirectExchange.directExchange("staff.direct");
    }

    @Bean
    public Binding testBinding(Queue testQueue, DirectExchange testDirectExchange) {
        return directBindingQueue.directBindingQueue(testQueue,testDirectExchange,"query");
    }
}
