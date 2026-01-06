package com.cloudbalance.service;

import com.cloudbalance.dto.LoginDto;
import com.cloudbalance.entity.RefreshTokenEntity;
import com.cloudbalance.entity.UserEntity;
import com.cloudbalance.repository.UserRepository;
import com.cloudbalance.utils.JwtUtils;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final RefreshTokenService refreshTokenService;

    public AuthService(
            AuthenticationManager authenticationManager,
            UserRepository userRepository,
            JwtUtils jwtUtils,
            RefreshTokenService refreshTokenService
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
        this.refreshTokenService = refreshTokenService;
    }

    public Map<String, Object> login(LoginDto loginDto) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginDto.getEmail(),
                                loginDto.getPassword()
                        )
                );

        UserDetails userDetails =
                (UserDetails) authentication.getPrincipal();

        UserEntity user =
                userRepository.findByEmail(userDetails.getUsername())
                        .orElseThrow(() ->
                                new UsernameNotFoundException("User not found")
                        );

        user.setLastLogin(Instant.now());
        userRepository.save(user);

        String accessToken =
                jwtUtils.generateToken(
                        user.getEmail(),
                        user.getRole()
                );

        RefreshTokenEntity refreshToken =
                refreshTokenService.createOrUpdateRefreshToken(user);


        Map<String, Object> response = new HashMap<>();
        response.put("accessToken", accessToken);
        response.put("refreshToken", refreshToken.getToken());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());

        return response;
    }


}
