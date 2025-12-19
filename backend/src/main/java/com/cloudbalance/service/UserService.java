package com.cloudbalance.service;

import com.cloudbalance.dto.UserRequestDTO;
import com.cloudbalance.dto.UserResponseDTO;

import java.util.List;

public interface UserService {

    List<UserResponseDTO> getUsers();
    UserResponseDTO addUsers(UserRequestDTO userRequestDTO);
    UserResponseDTO updateUsers(Long id , UserRequestDTO dto);
}
