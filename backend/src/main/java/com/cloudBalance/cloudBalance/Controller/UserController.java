package com.cloudBalance.cloudBalance.Controller;

import com.cloudBalance.cloudBalance.DTO.UserRequestDTO;
import com.cloudBalance.cloudBalance.DTO.UserResponseDTO;
import com.cloudBalance.cloudBalance.Service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins="*")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/getUsers")
    public List<UserResponseDTO> getUsers(){
        return userService.getUsers();
    }

    @PostMapping("/addUsers")
    public UserResponseDTO addUsers(
            @Valid @RequestBody UserRequestDTO userRequestDTO
    ) {
        return userService.addUsers(userRequestDTO);
    }

    @PutMapping("/updateUsers/{id}")
    public UserResponseDTO updateUsers(
            @PathVariable Long id,
            @Valid @RequestBody UserRequestDTO dto
    ) {
        return userService.updateUsers(id, dto);
    }
}

