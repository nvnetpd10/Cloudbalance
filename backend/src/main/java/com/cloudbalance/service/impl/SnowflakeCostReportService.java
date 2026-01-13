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
}
