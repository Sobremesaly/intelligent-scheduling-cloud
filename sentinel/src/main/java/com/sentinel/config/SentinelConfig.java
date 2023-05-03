package com.sentinel.config;

import com.alibaba.csp.sentinel.slots.block.RuleConstant;
import com.alibaba.csp.sentinel.slots.block.flow.FlowRule;
import com.alibaba.csp.sentinel.slots.block.flow.FlowRuleManager;
import org.springframework.context.annotation.Configuration;
import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

/**
 * @author 小叶子
 */
@Configuration
public class SentinelConfig {

    @PostConstruct
    public void init() {
        // 配置规则
        initFlowRules();
    }

    private void initFlowRules() {
        List<FlowRule> rules = new ArrayList<>();
        FlowRule rule = new FlowRule();
        rule.setResource("test");
        rule.setGrade(RuleConstant.FLOW_GRADE_QPS);
        rule.setCount(10);
        rules.add(rule);
        FlowRuleManager.loadRules(rules);
    }
}

