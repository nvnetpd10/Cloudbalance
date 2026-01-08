package com.cloudbalance.controller;

import com.cloudbalance.entity.OnboardedAccountEntity;
import com.cloudbalance.service.OnboardedAccountService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/onboarding/accounts")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class OnboardedAccountController {

    private final OnboardedAccountService service;

    public OnboardedAccountController(OnboardedAccountService service) {
        this.service = service;
    }

    @GetMapping
    public List<OnboardedAccountEntity> getAllAccounts() {
        return service.getAllAccounts();
    }

    @PostMapping
    public OnboardedAccountEntity createAccount(
            @RequestBody OnboardedAccountEntity account
    ) {
        return service.createAccount(account);
    }


}
