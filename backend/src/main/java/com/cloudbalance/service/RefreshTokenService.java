////package com.cloudbalance.service;
////
////import com.cloudbalance.entity.RefreshTokenEntity;
////import com.cloudbalance.entity.UserEntity;
////import com.cloudbalance.repository.RefreshTokenRepository;
////import org.springframework.stereotype.Service;
////
////import java.time.Instant;
////import java.util.UUID;
////
////import org.springframework.transaction.annotation.Transactional;
////
////
////@Service
////public class RefreshTokenService {
////
////    private static final long REFRESH_EXPIRATION = 7 * 24 * 60 * 60 * 1000; // 7 days
////
////    private final RefreshTokenRepository refreshTokenRepository;
////
////    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository) {
////        this.refreshTokenRepository = refreshTokenRepository;
////    }
////
////    @Transactional
////    public RefreshTokenEntity createOrUpdateRefreshToken(UserEntity user) {
////
////        RefreshTokenEntity token =
////                refreshTokenRepository.findByUser(user)
////                        .orElse(new RefreshTokenEntity());
////
////        token.setUser(user);
////        token.setToken(UUID.randomUUID().toString());
////        token.setExpiryDate(Instant.now().plusMillis(REFRESH_EXPIRATION));
////
////        return refreshTokenRepository.save(token);
////    }
////
////    public RefreshTokenEntity verifyExpiration(RefreshTokenEntity token) {
////        if (token.getExpiryDate().isBefore(Instant.now())) {
////            refreshTokenRepository.delete(token);
////            throw new RuntimeException("Refresh token expired");
////        }
////        return token;
////    }
////}
//
//package com.cloudbalance.service;
//
//import com.cloudbalance.entity.RefreshTokenEntity;
//import com.cloudbalance.entity.UserEntity;
//import com.cloudbalance.repository.RefreshTokenRepository;
//import org.springframework.security.authentication.CredentialsExpiredException;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.time.Instant;
//import java.util.UUID;
//
//@Service
//public class RefreshTokenService {
//
//    private static final long REFRESH_EXPIRATION =
//            7 * 24 * 60 * 60 * 1000;
//
//    private final RefreshTokenRepository refreshTokenRepository;
//
//    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository) {
//        this.refreshTokenRepository = refreshTokenRepository;
//    }
//
//    @Transactional
//    public RefreshTokenEntity createOrUpdateRefreshToken(UserEntity user) {
//
//        RefreshTokenEntity token =
//                refreshTokenRepository.findByUser(user)
//                        .orElse(new RefreshTokenEntity());
//
//        token.setUser(user);
//        token.setToken(UUID.randomUUID().toString());
//        token.setExpiryDate(
//                Instant.now().plusMillis(REFRESH_EXPIRATION)
//        );
//
//        return refreshTokenRepository.save(token);
//    }
//
//    public RefreshTokenEntity verifyExpiration(RefreshTokenEntity token) {
//        if (token.getExpiryDate().isBefore(Instant.now())) {
//            refreshTokenRepository.delete(token);
//            throw new CredentialsExpiredException("Refresh token expired");
//        }
//        return token;
//    }
//}
//

package com.cloudbalance.service;

import com.cloudbalance.entity.RefreshTokenEntity;
import com.cloudbalance.entity.UserEntity;
import com.cloudbalance.repository.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final long refreshExpirationMs;

    public RefreshTokenService(
            RefreshTokenRepository refreshTokenRepository,
            @Value("${app.refresh-token.expiration-ms:604800000}") long refreshExpirationMs
    ) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.refreshExpirationMs = refreshExpirationMs;
    }

    @Transactional
    public RefreshTokenEntity createOrUpdateRefreshToken(UserEntity user) {

        RefreshTokenEntity token = refreshTokenRepository.findByUser(user)
                .orElseGet(RefreshTokenEntity::new);

        token.setUser(user);
        token.setToken(UUID.randomUUID().toString());
        token.setExpiryDate(Instant.now().plusMillis(refreshExpirationMs));

        return refreshTokenRepository.save(token);
    }

    public RefreshTokenEntity verifyExpiration(RefreshTokenEntity token) {
        if (token == null) {
            throw new CredentialsExpiredException("Refresh token missing");
        }

        if (token.getExpiryDate() == null || token.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(token);
            throw new CredentialsExpiredException("Refresh token expired");
        }

        return token;
    }
}
