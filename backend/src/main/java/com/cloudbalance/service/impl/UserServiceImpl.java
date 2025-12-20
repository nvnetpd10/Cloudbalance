package com.cloudbalance.service.impl;

import com.cloudbalance.dto.UserRequestDTO;
import com.cloudbalance.dto.UserResponseDTO;
import com.cloudbalance.entity.UserEntity;
import com.cloudbalance.mapper.UserMapper;
import com.cloudbalance.repository.UserRepository;
import com.cloudbalance.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<UserResponseDTO> getUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserMapper::toResponseDTO)
                .toList();
    }

    @Override
    public UserResponseDTO addUser(UserRequestDTO dto) {

        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("USER_EMAIL_EXISTS");
        }

        UserEntity user = UserMapper.toEntity(dto);
        return UserMapper.toResponseDTO(userRepository.save(user));
    }

    @Override
    public UserResponseDTO updateUser(Long id, UserRequestDTO dto) {

        UserEntity existing = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userRepository.findByEmail(dto.getEmail())
                .filter(u -> !u.getId().equals(id))
                .ifPresent(u -> {
                    throw new RuntimeException("USER_EMAIL_EXISTS");
                });

        existing.setFirstName(dto.getFirstName());
        existing.setLastName(dto.getLastName());
        existing.setEmail(dto.getEmail());
        existing.setRole(dto.getRole());
        existing.setPassword(dto.getPassword());

        return UserMapper.toResponseDTO(userRepository.save(existing));
    }

    @Override
    public UserResponseDTO getUserById(Long id){
        UserEntity user = userRepository.findById(id).orElseThrow(() ->
                new RuntimeException("User not found"));
        return UserMapper.toResponseDTO(user);
    }

    @Override
    public UserResponseDTO patchUser(Long id , UserRequestDTO dto){
        UserEntity user = userRepository.findById(id).orElseThrow(() ->
                new RuntimeException("User not found"));
        if(dto.getFirstName() != null){
            user.setFirstName(dto.getFirstName());
        }
        if(dto.getLastName() != null){
            user.setLastName(dto.getLastName());
        }
        if(dto.getEmail() != null){
            user.setEmail(dto.getEmail());
        }
        if (dto.getRole() != null){
            user.setRole(dto.getRole());
        }
        if (dto.getPassword() != null){
            user.setPassword(dto.getPassword());
        }
        return UserMapper.toResponseDTO(userRepository.save(user));
    }
    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }
}



