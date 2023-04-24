package com.mq;

import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageBuilder;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AMQPTest {
    @Resource
    private RabbitTemplate rabbitTemplate;
    @Test
    public void testTemplate() {
        String directExchange = "staff.direct";
        String routingKey = "query";
        String message = "test message";
        rabbitTemplate.convertAndSend(directExchange, routingKey, message);
    }

    @Test
    public void testGetMessage() {
        System.err.println(rabbitTemplate.convertSendAndReceiveAsType("test.direct", "test", "order", new ParameterizedTypeReference<String>() {
        }));

    }
}
