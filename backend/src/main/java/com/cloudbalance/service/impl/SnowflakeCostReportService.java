package com.cloudbalance.service.impl;

import com.cloudbalance.dto.CostRequestDTO;
import com.cloudbalance.dto.CostResponseDTO;
import com.cloudbalance.snowflake.SnowFlakeJDBC;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class SnowflakeCostReportService {

    private final JdbcTemplate jdbc = SnowFlakeJDBC.getJdbcTemplate();

    public List<Map<String, Object>> getCostReport() {
        String sql =
                "SELECT ID, BILL_DATE, SERVICE, INSTANCE_TYPE, ACCOUNT_ID, USAGE_TYPE, PLATFORM, REGION, " +
                        "PURCHASE_OPTION, USAGE_TYPE_GROUP, API_OPERATION, RESOURCE, AVAILABILITY_ZONE, TENANCY, " +
                        "LEGAL_ENTITY, BILLING_ENTITY, COST " +
                        "FROM SNOWFLAKE_LEARNING_DB.AWS_CUR.COSTREPORT";

        return jdbc.queryForList(sql);

    }

public List<CostResponseDTO> getCostReportGrouped(CostRequestDTO request) {
    String column = request.getGroupByColumn().toUpperCase();

    String sql = "SELECT BILL_DATE, " + column + " AS GROUP_KEY, " +
            "SUM(COST) AS TOTAL_COST " +
            "FROM SNOWFLAKE_LEARNING_DB.AWS_CUR.COSTREPORT " +
            "WHERE BILL_DATE >= ? AND BILL_DATE <= ? " +
            "GROUP BY BILL_DATE, " + column + " " +
            "ORDER BY BILL_DATE ASC";

    return jdbc.query(
            sql,
            (rs, rowNum) -> new CostResponseDTO(
                    rs.getDate("BILL_DATE"),
                    rs.getString("GROUP_KEY"),
                    rs.getBigDecimal("TOTAL_COST")
            ),
            java.sql.Date.valueOf(request.getStartDate()),
            java.sql.Date.valueOf(request.getEndDate())
    );
}
}
