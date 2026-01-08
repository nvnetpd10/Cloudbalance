package com.cloudbalance.repository;

import com.cloudbalance.entity.OnboardedAccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OnboardedAccountRepository
        extends JpaRepository<OnboardedAccountEntity, Long> {
}
