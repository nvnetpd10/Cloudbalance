package com.cloudbalance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
public class CostResponseDTO {
    private Date billDate;
    private String groupKey;
    private BigDecimal totalCost;
}