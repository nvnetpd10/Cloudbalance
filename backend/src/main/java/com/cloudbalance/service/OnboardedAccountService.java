//package com.cloudbalance.service;
//
//import com.cloudbalance.entity.OnboardedAccountEntity;
//import com.cloudbalance.repository.OnboardedAccountRepository;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//
//@Service
//public class OnboardedAccountService {
//
//    private final OnboardedAccountRepository repository;
//
//    public OnboardedAccountService(OnboardedAccountRepository repository) {
//        this.repository = repository;
//    }
//
//    public List<OnboardedAccountEntity> getAllAccounts() {
//        return repository.findAll();
//    }
//
//    // ✅ ADD
//    public OnboardedAccountEntity createAccount(OnboardedAccountEntity account) {
//
//        if (repository.existsByAccountId(account.getAccountId())) {
//            throw new IllegalArgumentException("Account ID already exists");
//        }
//
//        if (repository.existsByArn(account.getArn())) {
//            throw new IllegalArgumentException("ARN already exists");
//        }
//
//        return repository.save(account);
//    }
//
//    // ✅ UPDATE
//    public OnboardedAccountEntity updateAccount(Long id, OnboardedAccountEntity account) {
//
//        OnboardedAccountEntity existing =
//                repository.findById(id)
//                        .orElseThrow(() -> new RuntimeException("Account not found"));
//
//        // 🔒 uniqueness checks (ignore same record)
//        if (repository.existsByAccountIdAndIdNot(account.getAccountId(), id)) {
//            throw new IllegalArgumentException("Account ID already exists");
//        }
//
//        if (repository.existsByArnAndIdNot(account.getArn(), id)) {
//            throw new IllegalArgumentException("ARN already exists");
//        }
//
//        existing.setAccountId(account.getAccountId());
//        existing.setAccountName(account.getAccountName());
//        existing.setArn(account.getArn());
//
//        return repository.save(existing);
//    }
//}
//
//

package com.cloudbalance.service;

import com.cloudbalance.entity.OnboardedAccountEntity;
import com.cloudbalance.repository.OnboardedAccountRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    // ✅ ADD
    public OnboardedAccountEntity createAccount(OnboardedAccountEntity account) {

        if (account.getAccountId() == null || account.getAccountId().isBlank()) {
            throw new IllegalArgumentException("Account ID is required");
        }
        if (account.getArn() == null || account.getArn().isBlank()) {
            throw new IllegalArgumentException("ARN is required");
        }

        if (repository.existsByAccountId(account.getAccountId())) {
            throw new IllegalArgumentException("Account ID already exists");
        }
        if (repository.existsByArn(account.getArn())) {
            throw new IllegalArgumentException("ARN already exists");
        }

        return repository.save(account);
    }

    // ✅ UPDATE
    @Transactional
    public OnboardedAccountEntity updateAccount(Long id, OnboardedAccountEntity account) {

        OnboardedAccountEntity existing =
                repository.findById(id)
                        .orElseThrow(() -> new IllegalArgumentException("Account not found"));

        if (account.getAccountId() == null || account.getAccountId().isBlank()) {
            throw new IllegalArgumentException("Account ID is required");
        }
        if (account.getArn() == null || account.getArn().isBlank()) {
            throw new IllegalArgumentException("ARN is required");
        }

        // 🔒 uniqueness checks (ignore same record)
        if (repository.existsByAccountIdAndIdNot(account.getAccountId(), id)) {
            throw new IllegalArgumentException("Account ID already exists");
        }
        if (repository.existsByArnAndIdNot(account.getArn(), id)) {
            throw new IllegalArgumentException("ARN already exists");
        }

        existing.setAccountId(account.getAccountId());
        existing.setAccountName(account.getAccountName());
        existing.setArn(account.getArn());

        return repository.save(existing);
    }
}
