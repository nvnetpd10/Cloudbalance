//package com.cloudbalance.service;
//
//import com.cloudbalance.dto.LoginDto;
//import com.cloudbalance.entity.RefreshTokenEntity;
//import com.cloudbalance.entity.UserEntity;
//import com.cloudbalance.repository.UserRepository;
//import com.cloudbalance.utils.JwtUtils;
//
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.time.Instant;
//import java.util.HashMap;
//import java.util.Map;
//
//@Service
//public class AuthService {
//
//    private final AuthenticationManager authenticationManager;
//    private final UserRepository userRepository;
//    private final JwtUtils jwtUtils;
//    private final RefreshTokenService refreshTokenService;
//
//    public AuthService(
//            AuthenticationManager authenticationManager,
//            UserRepository userRepository,
//            JwtUtils jwtUtils,
//            RefreshTokenService refreshTokenService
//    ) {
//        this.authenticationManager = authenticationManager;
//        this.userRepository = userRepository;
//        this.jwtUtils = jwtUtils;
//        this.refreshTokenService = refreshTokenService;
//    }
//
//    public Map<String, Object> login(LoginDto loginDto) {
//
//        Authentication authentication =
//                authenticationManager.authenticate(
//                        new UsernamePasswordAuthenticationToken(
//                                loginDto.getEmail(),
//                                loginDto.getPassword()
//                        )
//                );
//
//        UserDetails userDetails =
//                (UserDetails) authentication.getPrincipal();
//
//        UserEntity user =
//                userRepository.findByEmail(userDetails.getUsername())
//                        .orElseThrow(() ->
//                                new UsernameNotFoundException("User not found")
//                        );
//
//        user.setLastLogin(Instant.now());
//        userRepository.save(user);
//
//        String accessToken =
//                jwtUtils.generateToken(
//                        user.getEmail(),
//                        user.getRole(),
//                        user.getFirstName(),
//                        user.getLastName()
//                );
//
//        RefreshTokenEntity refreshToken =
//                refreshTokenService.createOrUpdateRefreshToken(user);
//
//
//        Map<String, Object> response = new HashMap<>();
//        response.put("accessToken", accessToken);
//        response.put("refreshToken", refreshToken.getToken());
//        response.put("email", user.getEmail());
//        response.put("role", user.getRole());
//
//        return response;
//    }
//
//
//}

//package com.cloudbalance.service;
//
//import com.cloudbalance.dto.LoginDto;
//import com.cloudbalance.entity.RefreshTokenEntity;
//import com.cloudbalance.entity.UserEntity;
//import com.cloudbalance.repository.UserRepository;
//import com.cloudbalance.utils.JwtUtils;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.time.Instant;
//import java.util.HashMap;
//import java.util.Map;
//
//@Service
//public class AuthService {
//
//    private final AuthenticationManager authenticationManager;
//    private final UserRepository userRepository;
//    private final JwtUtils jwtUtils;
//    private final RefreshTokenService refreshTokenService;
//
//    public AuthService(
//            AuthenticationManager authenticationManager,
//            UserRepository userRepository,
//            JwtUtils jwtUtils,
//            RefreshTokenService refreshTokenService
//    ) {
//        this.authenticationManager = authenticationManager;
//        this.userRepository = userRepository;
//        this.jwtUtils = jwtUtils;
//        this.refreshTokenService = refreshTokenService;
//    }
//
//    @Transactional
//    public Map<String, Object> login(LoginDto loginDto) {
//
//        // 1) Authenticate (throws BadCredentialsException automatically if wrong)
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        loginDto.getEmail(),
//                        loginDto.getPassword()
//                )
//        );
//
//        // 2) Get principal
//        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//
//        // 3) Load full entity (needed for role/firstName/lastName + refresh token relation)
//        UserEntity user = userRepository.findByEmail(userDetails.getUsername())
//                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
//
//        // 4) Update last login
//        user.setLastLogin(Instant.now());
//        userRepository.save(user);
//
//        // 5) Generate access token
//        String accessToken = jwtUtils.generateToken(
//                user.getEmail(),
//                user.getRole(),
//                user.getFirstName(),
//                user.getLastName()
//        );
//
//        // 6) Create/rotate refresh token
//        RefreshTokenEntity refreshToken = refreshTokenService.createOrUpdateRefreshToken(user);
//
//        // 7) Response
//        Map<String, Object> response = new HashMap<>();
//        response.put("accessToken", accessToken);
//        response.put("refreshToken", refreshToken.getToken());
//        response.put("email", user.getEmail());
//        response.put("role", user.getRole());
//        return response;
//    }
//}

package com.cloudbalance.service;

import com.cloudbalance.dto.LoginDto;
import com.cloudbalance.entity.RefreshTokenEntity;
import com.cloudbalance.entity.UserEntity;
import com.cloudbalance.repository.RefreshTokenRepository;
import com.cloudbalance.repository.UserRepository;
import com.cloudbalance.utils.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final RefreshTokenService refreshTokenService;
    private final RefreshTokenRepository refreshTokenRepository;

    public AuthService(
            AuthenticationManager authenticationManager,
            UserRepository userRepository,
            JwtUtils jwtUtils,
            RefreshTokenService refreshTokenService,
            RefreshTokenRepository refreshTokenRepository
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
        this.refreshTokenService = refreshTokenService;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Transactional
    public Map<String, Object> login(LoginDto loginDto) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()
                )
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        UserEntity user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        user.setLastLogin(Instant.now());
        userRepository.save(user);

        String accessToken = jwtUtils.generateToken(
                user.getEmail(),
                user.getRole(),
                user.getFirstName(),
                user.getLastName()
        );

        RefreshTokenEntity refreshToken = refreshTokenService.createOrUpdateRefreshToken(user);

        Map<String, Object> response = new HashMap<>();
        response.put("accessToken", accessToken);
        response.put("refreshToken", refreshToken.getToken());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());
        return response;
    }

    public Map<String, Object> refreshAccessToken(String refreshTokenValue) {

        if (refreshTokenValue == null || refreshTokenValue.isBlank()) {
            throw new org.springframework.security.authentication.CredentialsExpiredException("Refresh token missing");
        }

        RefreshTokenEntity refreshToken = refreshTokenRepository.findByToken(refreshTokenValue)
                .map(refreshTokenService::verifyExpiration)
                .orElseThrow(() ->
                        new org.springframework.security.authentication.CredentialsExpiredException("Refresh token invalid or expired")
                );

        UserEntity user = refreshToken.getUser();

        String newAccessToken = jwtUtils.generateToken(
                user.getEmail(),
                user.getRole(),
                user.getFirstName(),
                user.getLastName()
        );

        return Map.of("accessToken", newAccessToken);
    }
}
