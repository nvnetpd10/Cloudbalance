
package com.cloudbalance.controller;

import com.cloudbalance.dto.CostRequestDTO;
import com.cloudbalance.dto.CostResponseDTO;
import com.cloudbalance.service.impl.SnowflakeCostReportService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/snowflake", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor

public class SnowflakeCostReportController {

    private final SnowflakeCostReportService service;

    @GetMapping("/costreport")
    public List<Map<String, Object>> costReport() {
        return service.getCostReport();
    }

    @PostMapping(value = "/getCostReportGrouped", consumes = MediaType.APPLICATION_JSON_VALUE)
    public List<CostResponseDTO> getGroupedReport(@Valid @RequestBody CostRequestDTO request) {
        return service.getCostReportGrouped(request);
    }
}
