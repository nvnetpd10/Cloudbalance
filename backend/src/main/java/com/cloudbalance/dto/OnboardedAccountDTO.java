package com.cloudbalance.dto;

public class OnboardedAccountDTO {

    private Long id;
    private String accountId;
    private String accountName;

    public OnboardedAccountDTO() {}

    public OnboardedAccountDTO(Long id, String accountId, String accountName) {
        this.id = id;
        this.accountId = accountId;
        this.accountName = accountName;
    }

    public Long getId() {
        return id;
    }

    public String getAccountId() {
        return accountId;
    }

    public String getAccountName() {
        return accountName;
    }
}
