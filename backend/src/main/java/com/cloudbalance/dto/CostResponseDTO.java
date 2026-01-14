package com.cloudbalance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@Data
@AllArgsConstructor
public class CostResponseDTO {
    private Date billDate;
    private String groupKey;
    private BigDecimal totalCost;
}