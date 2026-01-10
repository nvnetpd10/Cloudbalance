package com.cloudbalance.repository;

import com.cloudbalance.entity.OnboardedAccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OnboardedAccountRepository
        extends JpaRepository<OnboardedAccountEntity, Long> {

    boolean existsByAccountId(String accountId);

    boolean existsByArn(String arn);

    boolean existsByAccountIdAndIdNot(String accountId, Long id);

    boolean existsByArnAndIdNot(String arn, Long id);
}

