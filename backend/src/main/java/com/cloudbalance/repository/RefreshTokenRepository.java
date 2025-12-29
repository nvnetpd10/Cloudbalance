package com.cloudbalance.repository;

import com.cloudbalance.entity.RefreshToken;
import com.cloudbalance.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);

    // Ye method zaroori hai AuthController/Service ke liye
    void deleteByUser(UserEntity user);
}