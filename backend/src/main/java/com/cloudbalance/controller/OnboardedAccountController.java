
package com.cloudbalance.controller;

import com.cloudbalance.entity.OnboardedAccountEntity;
import com.cloudbalance.service.OnboardedAccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/onboarding/accounts", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class OnboardedAccountController {

    private final OnboardedAccountService service;

    @GetMapping
    public List<OnboardedAccountEntity> getAllAccounts() {
        return service.getAllAccounts();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public OnboardedAccountEntity createAccount(@Valid @RequestBody OnboardedAccountEntity account) {
        return service.createAccount(account);
    }
}
