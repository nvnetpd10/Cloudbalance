package com.cloudbalance.controller;

import com.cloudbalance.dto.UserRequestDTO;
import com.cloudbalance.dto.UserResponseDTO;
import com.cloudbalance.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // Get all users
    @GetMapping
    public List<UserResponseDTO> getUsers() {
        return userService.getUsers();
    }

    // Get a user by ID
    @GetMapping("/{id}")
    public UserResponseDTO getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // Add a new user
    @PostMapping
    public UserResponseDTO addUser(
            @Valid @RequestBody UserRequestDTO userRequestDTO
    ) {
        return userService.addUser(userRequestDTO);
    }

    // Update an existing user (full update)
    @PutMapping("/{id}")
    public UserResponseDTO updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserRequestDTO dto
    ) {
        return userService.updateUser(id, dto);
    }

    @PatchMapping("/{id}/active")
    public UserResponseDTO updateUserActive(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> body
    ) {
        return userService.updateUserActiveStatus(id, body.get("active"));
    }

}
