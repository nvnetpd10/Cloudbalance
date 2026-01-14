//package com.cloudbalance.controller;
//
//import com.cloudbalance.dto.CostRequestDTO;
//import com.cloudbalance.dto.CostResponseDTO;
//import com.cloudbalance.service.impl.SnowflakeCostReportService;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@CrossOrigin(origins = "http://localhost:5173")
//public class SnowflakeCostReportController {
//
//    private final SnowflakeCostReportService service;
//
//    public SnowflakeCostReportController(SnowflakeCostReportService service) {
//        this.service = service;
//    }
//
//    @GetMapping("/api/snowflake/costreport")
//    public List<Map<String, Object>> costReport() {
//        return service.getCostReport();
//    }
//
//    @PostMapping("/api/snowflake/getCostReportGrouped")
//    public List<CostResponseDTO> getGroupedReport(@RequestBody CostRequestDTO request) {
//        // 1. Capture the list from the service
//        List<CostResponseDTO> reportData = service.getCostReportGrouped(request);
//
//        // 2. Return the list (Spring will convert this to JSON for React)
//        return reportData;
//    }
//}


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
// If you already configured global CORS in WebConfig + SecurityConfig, remove this.
// @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
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
