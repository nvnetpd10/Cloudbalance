package com.cloudbalance.controller;

import com.cloudbalance.dto.LoginDto;
import com.cloudbalance.entity.RefreshTokenEntity;
import com.cloudbalance.entity.UserEntity;
import com.cloudbalance.repository.RefreshTokenRepository;
import com.cloudbalance.service.AuthService;
import com.cloudbalance.service.RefreshTokenService;
import com.cloudbalance.utils.JwtUtils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;


import java.util.Arrays;
import java.util.Map;
import java.util.Optional;

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
    public ResponseEntity<?> login(
            @RequestBody LoginDto loginDto,
            HttpServletResponse response
    ) {
        try {
            Map<String, Object> data = authService.login(loginDto);

            String refreshToken = (String) data.remove("refreshToken");

            ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                    .httpOnly(true)
                    .secure(false) // true in production (HTTPS)
                    .path("/auth/refresh")
                    .maxAge(7 * 24 * 60 * 60)
                    .sameSite("Lax")
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            return ResponseEntity.ok(data);

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
    public ResponseEntity<?> refresh(HttpServletRequest request) {

        RefreshTokenEntity refreshToken =
                refreshTokenRepository.findByToken(
                                Arrays.stream(Optional.ofNullable(request.getCookies()).orElse(new Cookie[0]))
                                        .filter(c -> c.getName().equals("refreshToken"))
                                        .findFirst()
                                        .map(Cookie::getValue)
                                        .orElse(null)
                        )
                        .map(refreshTokenService::verifyExpiration)
                        .orElse(null);

        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Refresh token invalid or expired"));
        }

        UserEntity user = refreshToken.getUser();

        String newAccessToken =
                jwtUtils.generateToken(user.getEmail(), user.getRole() , user.getFirstName() , user.getLastName());

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
