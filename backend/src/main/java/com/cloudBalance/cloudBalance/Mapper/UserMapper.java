package com.cloudBalance.cloudBalance.Mapper;

import com.cloudBalance.cloudBalance.Entity.UserEntity;
import com.cloudBalance.cloudBalance.DTO.UserRequestDTO;
import com.cloudBalance.cloudBalance.DTO.UserResponseDTO;

import java.time.Instant;

public class UserMapper {

    // Convert request DTO -> Entity
    public static UserEntity toEntity(UserRequestDTO dto) {
        UserEntity user = new UserEntity();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setRole(dto.getRole());
        user.setPassword(dto.getPassword());
        user.setLastLogin(null);
        user.setActive(true);
        return user;
    }

    // Convert Entity -> response DTO
    public static UserResponseDTO toResponseDTO(UserEntity user) {
        UserResponseDTO dto = new UserResponseDTO();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setPassword(user.getPassword());
        dto.setLastLogin(user.getLastLogin());
        dto.setActive(user.isActive());
        return dto;
    }
}
