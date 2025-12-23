//package com.cloudbalance.controller;
//
//import com.cloudbalance.dto.LoginDto;
//import com.cloudbalance.service.impl.CustomUserDetailsService;
//import com.cloudbalance.utils.JwtUtils;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.core.Authentication;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/auth")
//@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
//public class AuthController {
//
//    @Autowired
//    private CustomUserDetailsService customUserDetailsService;
//
//    @Autowired
//    private JwtUtils jwtUtils;
//
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @GetMapping("/authCheck")
//    public ResponseEntity<?> me(Authentication authentication) {
//        System.out.println(authentication + " from auth check auth controller");
//
//        if (authentication == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//
//        return ResponseEntity.ok(authentication);
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
//        System.out.println("==================== LOGIN ATTEMPT ====================");
//        System.out.println("Email: " + loginDto.getEmail());
//        System.out.println("Password length: " + (loginDto.getPassword() != null ? loginDto.getPassword().length() : 0));
//
//        try {
//            // First check if user exists
//            UserDetails userDetails = customUserDetailsService.loadUserByUsername(loginDto.getEmail());
//            System.out.println("User found in database: " + loginDto.getEmail());
//            System.out.println("Stored password starts with: " + userDetails.getPassword().substring(0, Math.min(10, userDetails.getPassword().length())));
//            System.out.println("Is BCrypt format? " + (userDetails.getPassword().startsWith("$2a$") || userDetails.getPassword().startsWith("$2b$")));
//
//            // Now authenticate
//            Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(
//                            loginDto.getEmail(),
//                            loginDto.getPassword()
//                    )
//            );
//
//            System.out.println("✅ Authentication successful for: " + loginDto.getEmail());
//
//            // Get authenticated user details
//            UserDetails authenticatedUser = (UserDetails) authentication.getPrincipal();
//
//            // Generate JWT token
//            String token = jwtUtils.generateToken(authenticatedUser.getUsername());
//            System.out.println("✅ JWT token generated");
//
//            // Create response
//            Map<String, String> response = new HashMap<>();
//            response.put("token", token);
//            response.put("message", "Login success");
//            response.put("email", authenticatedUser.getUsername());
//
//            System.out.println("==================== LOGIN SUCCESS ====================");
//            return ResponseEntity.ok(response);
//
//        } catch (UsernameNotFoundException e) {
//            System.out.println("❌ User not found: " + loginDto.getEmail());
//
//            Map<String, String> errorResponse = new HashMap<>();
//            errorResponse.put("message", "User not found");
//
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
//
//        } catch (BadCredentialsException e) {
//            System.out.println("❌ Invalid password for: " + loginDto.getEmail());
//            System.out.println("Error: " + e.getMessage());
//
//            Map<String, String> errorResponse = new HashMap<>();
//            errorResponse.put("message", "Invalid email or password");
//
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
//
//        } catch (Exception e) {
//            System.out.println("❌ Authentication error: " + e.getClass().getName());
//            System.out.println("Error message: " + e.getMessage());
//            e.printStackTrace();
//
//            Map<String, String> errorResponse = new HashMap<>();
//            errorResponse.put("message", "Authentication failed: " + e.getMessage());
//
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
//        }
//    }
//
//    @PostMapping("/logout")
//    public ResponseEntity<?> logout(HttpServletResponse response) {
//        Map<String, String> logoutResponse = new HashMap<>();
//        logoutResponse.put("message", "Logout successful");
//
//        return ResponseEntity.ok(logoutResponse);
//    }
//}




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
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getEmail(),
                            loginDto.getPassword()
                    )
            );

            // Get authenticated user
            UserDetails authenticatedUser =
                    (UserDetails) authentication.getPrincipal();

            // 🔥 UPDATE LAST LOGIN
            UserEntity user = userRepository.findByEmail(authenticatedUser.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            user.setLastLogin(Instant.now());
            userRepository.save(user);

            // Generate JWT
            String token = jwtUtils.generateToken(authenticatedUser.getUsername());

            // Response
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
