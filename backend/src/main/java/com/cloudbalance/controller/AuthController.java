
package com.cloudbalance.controller;

import com.cloudbalance.dto.LoginDto;
import com.cloudbalance.entity.UserEntity;
import com.cloudbalance.repository.UserRepository;
import com.cloudbalance.service.impl.CustomUserDetailsService;
import com.cloudbalance.utils.JwtUtils;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

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
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getEmail(),
                            loginDto.getPassword()
                    )
            );

            UserDetails authenticatedUser =
                    (UserDetails) authentication.getPrincipal();

            UserEntity user = userRepository.findByEmail(authenticatedUser.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            user.setLastLogin(Instant.now());
            userRepository.save(user);

            String token = jwtUtils.generateToken(authenticatedUser.getUsername());

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("message", "Login success");
            response.put("email", authenticatedUser.getUsername());

            return ResponseEntity.ok(response);

        } catch (UsernameNotFoundException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);

        } catch (BadCredentialsException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Authentication failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Map<String, String> logoutResponse = new HashMap<>();
        logoutResponse.put("message", "Logout successful");
        return ResponseEntity.ok(logoutResponse);
    }
}
