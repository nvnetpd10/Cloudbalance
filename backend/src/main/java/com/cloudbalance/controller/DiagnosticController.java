package com.cloudbalance.controller;

import com.cloudbalance.entity.UserEntity;
import com.cloudbalance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/diagnostic")
@CrossOrigin(origins = "*")
public class DiagnosticController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/check-passwords")
    public Map<String, Object> checkPasswords() {
        List<UserEntity> users = userRepository.findAll();
        Map<String, Object> result = new HashMap<>();

        for (UserEntity user : users) {
            Map<String, String> userInfo = new HashMap<>();
            String password = user.getPassword();

            if (password == null) {
                userInfo.put("password", "NULL");
                userInfo.put("isBCrypt", "NO - PASSWORD IS NULL!");
                userInfo.put("length", "0");
            } else {
                userInfo.put("password", password);
                userInfo.put("isBCrypt", (password.startsWith("$2a$") || password.startsWith("$2b$")) ? "YES" : "NO");
                userInfo.put("length", String.valueOf(password.length()));
            }

            result.put(user.getEmail(), userInfo);
        }

        return result;
    }

    @PostMapping("/fix-passwords")
    public Map<String, String> fixPasswords() {
        List<UserEntity> users = userRepository.findAll();
        Map<String, String> result = new HashMap<>();
        int fixed = 0;
        int skipped = 0;

        for (UserEntity user : users) {
            String currentPassword = user.getPassword();

            if (currentPassword == null) {
                result.put(user.getEmail(), "SKIPPED - Password is NULL, cannot encode");
                skipped++;
                continue;
            }

            if (!currentPassword.startsWith("$2a$") && !currentPassword.startsWith("$2b$")) {
                // This is plain text - encode it
                String encodedPassword = passwordEncoder.encode(currentPassword);
                user.setPassword(encodedPassword);
                userRepository.save(user);

                result.put(user.getEmail(), "FIXED - was plain text, now BCrypt");
                fixed++;
            } else {
                result.put(user.getEmail(), "ALREADY BCRYPT - skipped");
            }
        }

        result.put("TOTAL_FIXED", String.valueOf(fixed));
        result.put("TOTAL_SKIPPED_NULL", String.valueOf(skipped));
        return result;
    }

    @PostMapping("/test-password")
    public Map<String, String> testPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String rawPassword = request.get("password");

        Map<String, String> result = new HashMap<>();

        UserEntity user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            result.put("status", "USER NOT FOUND");
            return result;
        }

        if (user.getPassword() == null) {
            result.put("status", "ERROR");
            result.put("message", "User password is NULL in database");
            result.put("email", email);
            return result;
        }

        boolean matches = passwordEncoder.matches(rawPassword, user.getPassword());

        result.put("email", email);
        result.put("rawPassword", rawPassword);
        result.put("storedPassword", user.getPassword());
        result.put("passwordMatches", matches ? "YES" : "NO");

        return result;
    }

    @PostMapping("/set-password")
    public Map<String, String> setPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("password");

        Map<String, String> result = new HashMap<>();

        if (newPassword == null || newPassword.isEmpty()) {
            result.put("status", "ERROR");
            result.put("message", "Password cannot be empty");
            return result;
        }

        UserEntity user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            result.put("status", "USER NOT FOUND");
            return result;
        }

        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedPassword);
        userRepository.save(user);

        result.put("status", "SUCCESS");
        result.put("email", email);
        result.put("message", "Password set successfully");

        return result;
    }
}