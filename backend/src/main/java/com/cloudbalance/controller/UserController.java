//package com.cloudbalance.controller;
//
//import com.cloudbalance.dto.UserRequestDTO;
//import com.cloudbalance.dto.UserResponseDTO;
//import com.cloudbalance.service.UserService;
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/users")
//@CrossOrigin(origins = "*")
//@RequiredArgsConstructor
//public class UserController {
//
//    private final UserService userService;
//
//    // ✅ GET ALL
//    @GetMapping
//    public List<UserResponseDTO> getUsers() {
//        return userService.getUsers();
//    }
//
//    // ✅ GET BY ID
//    @GetMapping("/{id}")
//    public UserResponseDTO getUserById(@PathVariable Long id) {
//        return userService.getUserById(id);
//    }
//
//    // ✅ ADD
//    @PostMapping
//    public UserResponseDTO addUser(
//            @Valid @RequestBody UserRequestDTO userRequestDTO
//    ) {
//        return userService.addUser(userRequestDTO);
//    }
//
//    // ✅ FULL UPDATE
//    @PutMapping("/{id}")
//    public UserResponseDTO updateUser(
//            @PathVariable Long id,
//            @Valid @RequestBody UserRequestDTO dto
//    ) {
//        return userService.updateUser(id, dto);
//    }
//
//    // ✅ PARTIAL UPDATE (PATCH)
//    @PatchMapping("/{id}")
//    public UserResponseDTO patchUser(
//            @PathVariable Long id,
//            @RequestBody UserRequestDTO dto
//    ) {
//        return userService.patchUser(id, dto);
//    }
//
//    // ✅ ACTIVE / INACTIVE
//    @PatchMapping("/{id}/active")
//    public UserResponseDTO updateUserActive(
//            @PathVariable Long id,
//            @RequestBody Map<String, Boolean> body
//    ) {
//        return userService.updateUserActiveStatus(id, body.get("active"));
//    }
//
//    // ✅ DELETE
//    @DeleteMapping("/{id}")
//    public void deleteUser(@PathVariable Long id) {
//        userService.deleteUser(id);
//    }
//}

package com.cloudbalance.controller;

import com.cloudbalance.dto.UserRequestDTO;
import com.cloudbalance.dto.UserResponseDTO;
import com.cloudbalance.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize; // Zaroori import for RBAC
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // RULE: Admin, Customer aur Readonly teeno users ki list dekh sakte hain
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'READONLY', 'CUSTOMER')")
    public List<UserResponseDTO> getUsers() {
        return userService.getUsers();
    }

    // RULE: Admin, Customer aur Readonly single user details dekh sakte hain
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'READONLY', 'CUSTOMER')")
    public UserResponseDTO getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // RULE: Sirf ADMIN hi naya user add kar sakta hai
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponseDTO addUser(
            @Valid @RequestBody UserRequestDTO userRequestDTO
    ) {
        return userService.addUser(userRequestDTO);
    }

    // RULE: Sirf ADMIN hi user details update (PUT) kar sakta hai
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponseDTO updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserRequestDTO dto
    ) {
        return userService.updateUser(id, dto);
    }

    // RULE: Sirf ADMIN hi partial update (PATCH) kar sakta hai
    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponseDTO patchUser(
            @PathVariable Long id,
            @RequestBody UserRequestDTO dto
    ) {
        return userService.patchUser(id, dto);
    }

    // RULE: Sirf ADMIN hi user ka active/inactive status badal sakta hai
    @PatchMapping("/{id}/active")
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponseDTO updateUserActive(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> body
    ) {
        return userService.updateUserActiveStatus(id, body.get("active"));
    }

    // RULE: Sirf ADMIN hi user delete kar sakta hai
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}