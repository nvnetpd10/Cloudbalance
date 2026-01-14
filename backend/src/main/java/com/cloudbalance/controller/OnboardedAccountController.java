//package com.cloudbalance.controller;
//
//import com.cloudbalance.entity.OnboardedAccountEntity;
//import com.cloudbalance.service.OnboardedAccountService;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/onboarding/accounts")
//@CrossOrigin(
//        origins = "http://localhost:5173",
//        allowCredentials = "true"
//)
//public class OnboardedAccountController {
//
//    private final OnboardedAccountService service;
//
//    public OnboardedAccountController(OnboardedAccountService service) {
//        this.service = service;
//    }
//
//    @GetMapping
//    public List<OnboardedAccountEntity> getAllAccounts() {
//        return service.getAllAccounts();
//    }
//
//    @PostMapping
//    public OnboardedAccountEntity createAccount(
//            @RequestBody OnboardedAccountEntity account
//    ) {
//        return service.createAccount(account);
//    }
//
//
//}


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
// If global CORS is already configured, remove this.
// @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
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
