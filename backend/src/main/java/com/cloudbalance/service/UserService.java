package com.cloudbalance.service;

import com.cloudbalance.dto.UserRequestDTO;
import com.cloudbalance.dto.UserResponseDTO;

import java.util.List;

public interface UserService {

    List<UserResponseDTO> getUsers();
    UserResponseDTO getUserById(Long id);
    UserResponseDTO addUser(UserRequestDTO userRequestDTO);
    UserResponseDTO updateUser(Long id , UserRequestDTO dto);
    UserResponseDTO patchUser(Long id , UserRequestDTO dto);
    void deleteUser(Long id);

}
