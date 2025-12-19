package com.cloudbalance.controller;

import com.cloudbalance.dto.UserRequestDTO;
import com.cloudbalance.dto.UserResponseDTO;
import com.cloudbalance.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/users")
@CrossOrigin(origins="*")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    @GetMapping
    public List<UserResponseDTO> getUsers(){
        return userService.getUsers();
    }

    @PostMapping("")
    public UserResponseDTO addUser(
            @Valid @RequestBody UserRequestDTO userRequestDTO
    ) {
        return userService.addUsers(userRequestDTO);
    }

    @PutMapping("/{id}")
    public UserResponseDTO updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserRequestDTO dto
    ) {
        return userService.updateUsers(id, dto);
    }
}

