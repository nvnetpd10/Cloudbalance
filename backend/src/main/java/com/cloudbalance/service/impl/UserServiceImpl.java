package com.cloudbalance.service.impl;

import com.cloudbalance.dto.UserRequestDTO;
import com.cloudbalance.dto.UserResponseDTO;
import com.cloudbalance.entity.UserEntity;
import com.cloudbalance.mapper.UserMapper;
import com.cloudbalance.repository.UserRepository;
import com.cloudbalance.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<UserResponseDTO> getUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserMapper::toResponseDTO)
                .toList();
    }

    @Override
    public UserResponseDTO addUsers(UserRequestDTO dto) {
        UserEntity user = UserMapper.toEntity(dto);
        UserEntity saved = userRepository.save(user);
        return UserMapper.toResponseDTO(saved);
    }

    @Override
    public UserResponseDTO updateUsers(Long id, UserRequestDTO dto) {

        UserEntity existing = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        existing.setFirstName(dto.getFirstName());
        existing.setLastName(dto.getLastName());
        existing.setEmail(dto.getEmail());
        existing.setRole(dto.getRole());
        existing.setPassword(dto.getPassword());
        // existing.setLastLogin(existing.getLastLogin());
        UserEntity updated = userRepository.save(existing);
        return UserMapper.toResponseDTO(updated);
    }

}
