package com.cloudbalance.controller;

import com.cloudbalance.dto.CostRequestDTO;
import com.cloudbalance.dto.CostResponseDTO;
import com.cloudbalance.service.impl.SnowflakeCostReportService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class SnowflakeCostReportController {

    private final SnowflakeCostReportService service;

    public SnowflakeCostReportController(SnowflakeCostReportService service) {
        this.service = service;
    }

    @GetMapping("/api/snowflake/costreport")
    public List<Map<String, Object>> costReport() {
        return service.getCostReport();
    }

//    @PostMapping("/api/snowflake/getCostReportGrouped")
//    public List<CostResponseDTO> getGroupedReport(@RequestBody CostRequestDTO request) {
//
//        service.getCostReportGrouped(request);
//        return null;
//    }

    @PostMapping("/api/snowflake/getCostReportGrouped")
    public List<CostResponseDTO> getGroupedReport(@RequestBody CostRequestDTO request) {
        // 1. Capture the list from the service
        List<CostResponseDTO> reportData = service.getCostReportGrouped(request);

        // 2. Return the list (Spring will convert this to JSON for React)
        return reportData;
    }
}
