package com.cloudbalance.controller;

import com.cloudbalance.dto.LoginDto;
import com.cloudbalance.entity.RefreshTokenEntity;
import com.cloudbalance.entity.UserEntity;
import com.cloudbalance.repository.RefreshTokenRepository;
import com.cloudbalance.service.AuthService;
import com.cloudbalance.service.RefreshTokenService;
import com.cloudbalance.utils.JwtUtils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class AuthController {

    private final AuthService authService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final RefreshTokenService refreshTokenService;
    private final JwtUtils jwtUtils;

    public AuthController(
            AuthService authService,
            RefreshTokenRepository refreshTokenRepository,
            RefreshTokenService refreshTokenService,
            JwtUtils jwtUtils
    ) {
        this.authService = authService;
        this.refreshTokenRepository = refreshTokenRepository;
        this.refreshTokenService = refreshTokenService;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("/authCheck")
    public ResponseEntity<?> authCheck(Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "User not authenticated"));
        }

        return ResponseEntity.ok(authentication);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {

        try {
            return ResponseEntity.ok(authService.login(loginDto));

        } catch (BadCredentialsException ex) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid email or password"));

        } catch (UsernameNotFoundException ex) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "User not found"));

        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Authentication failed"));
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody Map<String, String> request) {

        String token = request.get("refreshToken");

        if (token == null || token.isBlank()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Refresh token missing"));
        }

        RefreshTokenEntity refreshToken =
                refreshTokenRepository.findByToken(token)
                        .map(refreshTokenService::verifyExpiration)
                        .orElseThrow(() ->
                                new RuntimeException("Invalid refresh token")
                        );

        UserEntity user = refreshToken.getUser();

        String newAccessToken =
                jwtUtils.generateToken(user.getEmail(), user.getRole());

        return ResponseEntity.ok(
                Map.of("accessToken", newAccessToken)
        );
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok(
                Map.of("message", "Logout successful")
        );
    }
}
