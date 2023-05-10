package com.flowPrediction.service.impl;
import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.flowPrediction.mapper.FlowPredictionMapper;
import com.flowPrediction.pojo.FlowPrediction;
import com.flowPrediction.service.FlowPredictionService;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import java.sql.Date;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;

/**
 * @author 小叶子
 */
@Service
public class FlowPredictionServiceImpl implements FlowPredictionService {

    @Resource
    private FlowPredictionMapper flowPredictionMapper;

    @Override
    public String getFlowByWeek(String startDate) {
        HashMap<String, Object> map = new HashMap<>(2);
        // 将字符串转换为 LocalDate 类型
        LocalDate startTime = LocalDate.parse(startDate);
        LocalDate endTime = startTime.plusDays(7);
        java.sql.Date sqlStartDate = java.sql.Date.valueOf(startTime);
        java.sql.Date sqlEndDate = java.sql.Date.valueOf(endTime);
        try {
            QueryWrapper<FlowPrediction> queryWrapper = new QueryWrapper<>();
            queryWrapper.between("flow_date", sqlStartDate, sqlEndDate);
            List<FlowPrediction> resultList = flowPredictionMapper.selectList(queryWrapper);
            map.put("result", resultList);
            map.put("flag", "right");
        }
        catch (Exception e) {
            map.put("flag", "error");
            e.printStackTrace();
        }
        return JSON.toJSONString(map);
    }
}
