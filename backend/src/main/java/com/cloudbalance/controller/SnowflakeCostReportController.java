package com.cloudbalance.controller;

import com.cloudbalance.service.impl.SnowflakeCostReportService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class SnowflakeCostReportController {

    private final SnowflakeCostReportService service;

    public SnowflakeCostReportController(SnowflakeCostReportService service) {
        this.service = service;
    }

    @GetMapping("/api/snowflake/costreport")
    public List<Map<String, Object>> costReport() {
        return service.getCostReport();
    }
}
