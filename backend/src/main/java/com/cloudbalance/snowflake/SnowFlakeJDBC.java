package com.cloudbalance.snowflake;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class SnowFlakeJDBC {

    private static final String JDBC_URL =
            "jdbc:snowflake://jgwazim-wu66490.snowflakecomputing.com/?"
                    + "warehouse=snowflake_learning_wh"
                    + "&db=snowflake_learning_db"
                    + "&schema=AWS_CUR"
                    + "&role=cost_db_readonly"
                    + "&disable_arrow=true";

    private static final String USERNAME = "cost_read_user";
    private static final String PASSWORD = "aws_cost_report_read_only";

    private static JdbcTemplate jdbcTemplate;

    public static JdbcTemplate getJdbcTemplate() {
        if (jdbcTemplate == null) {

            HikariDataSource cfg = new HikariDataSource();
            cfg.setJdbcUrl(JDBC_URL);
            cfg.setUsername(USERNAME);
            cfg.setPassword(PASSWORD);

            cfg.setDriverClassName("net.snowflake.client.jdbc.SnowflakeDriver");

            cfg.setMaximumPoolSize(5);
            cfg.setPoolName("SnowflakeHikariPool");

            jdbcTemplate = new JdbcTemplate(cfg);
        }
        return jdbcTemplate;
    }
}
