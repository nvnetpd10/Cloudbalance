package com.cloudbalance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CostRequestDTO {
    private String startDate; // Expected format: "YYYY-MM-DD"
    private String endDate;
    private String groupByColumn; // e.g., "SERVICE", "REGION", "PLATFORM"
}