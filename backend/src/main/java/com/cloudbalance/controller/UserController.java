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

    // ✅ GET ALL
    @GetMapping
    public List<UserResponseDTO> getUsers() {
        return userService.getUsers();
    }

    // ✅ GET BY ID
    @GetMapping("/{id}")
    public UserResponseDTO getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // ✅ ADD
    @PostMapping
    public UserResponseDTO addUser(
            @Valid @RequestBody UserRequestDTO userRequestDTO
    ) {
        return userService.addUser(userRequestDTO);
    }

    // ✅ FULL UPDATE
    @PutMapping("/{id}")
    public UserResponseDTO updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserRequestDTO dto
    ) {
        return userService.updateUser(id, dto);
    }

    // ✅ PARTIAL UPDATE (PATCH)
    @PatchMapping("/{id}")
    public UserResponseDTO patchUser(
            @PathVariable Long id,
            @RequestBody UserRequestDTO dto
    ) {
        return userService.patchUser(id, dto);
    }

    // ✅ ACTIVE / INACTIVE
    @PatchMapping("/{id}/active")
    public UserResponseDTO updateUserActive(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> body
    ) {
        return userService.updateUserActiveStatus(id, body.get("active"));
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
