package com.flowPrediction.service;

import org.springframework.web.bind.annotation.PostMapping;

/**
 * @author 小叶子
 */
public interface FlowPredictionService {

    /**
     * 获取某一周的人流量
     * @param startDate 某一周的开始日期
     * @return 返回这一周的流量情况
     */
    @PostMapping("/flowPrediction/getFlowByWeek")
    String getFlowByWeek(String startDate);
}
