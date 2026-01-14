package com.cloudbalance.dto;

import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CostRequestDTO {
    private String startDate;
    private String endDate;
    private String groupByColumn;
}