
package com.cloudbalance.controller;

import com.cloudbalance.dto.LoginDto;
import com.cloudbalance.dto.TokenRefreshRequest;
import com.cloudbalance.dto.TokenResponse;
import com.cloudbalance.entity.RefreshToken;
import com.cloudbalance.entity.UserEntity;
import com.cloudbalance.repository.UserRepository;
import com.cloudbalance.service.RefreshTokenService;
import com.cloudbalance.utils.JwtUtils;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RefreshTokenService refreshTokenService; // Service inject kar di gayi hai

    @GetMapping("/authCheck")
    public ResponseEntity<?> me(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(authentication);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        try {
            // 1. User credentials verify karna
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getEmail(),
                            loginDto.getPassword()
                    )
            );

            UserDetails authenticatedUser = (UserDetails) authentication.getPrincipal();

            // 2. Database se user fetch karna
            UserEntity user = userRepository.findByEmail(authenticatedUser.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            // 3. Last Login time update karna
            user.setLastLogin(Instant.now());
            userRepository.save(user);

            // 4. Access Token generate karna
            String accessToken = jwtUtils.generateToken(authenticatedUser.getUsername());

            // 5. Refresh Token generate aur save karna
            // Purane tokens delete karna achi practice hai
            refreshTokenService.deleteByUserId(user.getId());
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());

            // 6. Full response dena
            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", accessToken);
            response.put("refreshToken", refreshToken.getToken());
            response.put("email", user.getEmail());
            response.put("role", user.getRole());
            response.put("message", "Login success");

            return ResponseEntity.ok(response);

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid email or password"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Authentication failed: " + e.getMessage()));
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody TokenRefreshRequest request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    // Naya Access Token generate karna
                    String token = jwtUtils.generateToken(user.getEmail());

                    // Best practice: Naya refresh token bhi return kar sakte hain (Token Rotation)
                    // Filhal hum wahi purana bhej rahe hain
                    return ResponseEntity.ok(TokenResponse.builder()
                            .accessToken(token)
                            .refreshToken(requestRefreshToken)
                            .build());
                })
                .orElseThrow(() -> new RuntimeException("Refresh token is not in database or expired!"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody Map<String, Long> request) {
        // Logout par DB se refresh token delete karna security ke liye best hai
        if (request.containsKey("userId")) {
            refreshTokenService.deleteByUserId(request.get("userId"));
        }
        return ResponseEntity.ok(Map.of("message", "Logout successful"));
    }
}