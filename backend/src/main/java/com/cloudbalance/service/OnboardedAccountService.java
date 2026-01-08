package com.cloudbalance.service;

import com.cloudbalance.entity.OnboardedAccountEntity;
import com.cloudbalance.repository.OnboardedAccountRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class OnboardedAccountService {

    private final OnboardedAccountRepository repository;

    public OnboardedAccountService(OnboardedAccountRepository repository) {
        this.repository = repository;
    }

    public List<OnboardedAccountEntity> getAllAccounts() {
        return repository.findAll();
    }


    public OnboardedAccountEntity createAccount(OnboardedAccountEntity account) {
        return repository.save(account);
    }
}

