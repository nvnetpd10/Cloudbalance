package com.cloudbalance.service.impl;

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

    public void getCostReportGrouped() {

        String groupByColumn = "SERVICE";
        String startDate = "2025-01-01";
        String endDate = "2025-01-04";

        String sql =
                "SELECT BILL_DATE, " + groupByColumn + " AS GROUP_KEY, " +
                        "       SUM(COST) AS TOTAL_COST " +
                        "FROM SNOWFLAKE_LEARNING_DB.AWS_CUR.COSTREPORT " +
                        "WHERE BILL_DATE >= ? AND BILL_DATE <= ? " +
                        "GROUP BY BILL_DATE, " + groupByColumn + " " +
                        "ORDER BY BILL_DATE ASC, TOTAL_COST DESC";


        List<Map<String, Object>> rows = jdbc.queryForList(
                sql,
                java.sql.Date.valueOf(startDate),
                java.sql.Date.valueOf(endDate)
        );

        for (Map<String, Object> row : rows) {
            System.out.println(
                    row.get("BILL_DATE") + " | " +
                            row.get("GROUP_KEY") + " -> " +
                            row.get("TOTAL_COST")
            );
        }



    }

}
