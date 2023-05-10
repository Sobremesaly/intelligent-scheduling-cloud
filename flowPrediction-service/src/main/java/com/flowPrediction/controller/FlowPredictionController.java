package com.flowPrediction.controller;

import com.flowPrediction.service.FlowPredictionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author 小叶子
 */
@Slf4j
@RestController
@RequestMapping(value = "/flowPrediction")
public class FlowPredictionController {

    @Resource
    private FlowPredictionService flowPredictionService;

    @PostMapping("/getFlowByWeek")
    String getFlowByWeek(@RequestParam String startDate) {
        return flowPredictionService.getFlowByWeek(startDate);
    }
}
