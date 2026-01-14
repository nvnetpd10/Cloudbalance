package com.cloudbalance.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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



}
