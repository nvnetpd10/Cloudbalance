package com.cloudBalance.cloudBalance.Service;

import com.cloudBalance.cloudBalance.DTO.UserRequestDTO;
import com.cloudBalance.cloudBalance.DTO.UserResponseDTO;

import java.util.List;

public interface UserService {

    List<UserResponseDTO> getUsers();
    UserResponseDTO addUsers(UserRequestDTO userRequestDTO);
    UserResponseDTO updateUsers(Long id , UserRequestDTO dto);
}
