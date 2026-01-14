
package com.cloudbalance.mapper;

import com.cloudbalance.dto.OnboardedAccountDTO;
import com.cloudbalance.entity.OnboardedAccountEntity;
import com.cloudbalance.entity.UserEntity;
import com.cloudbalance.dto.UserRequestDTO;
import com.cloudbalance.dto.UserResponseDTO;

import java.util.stream.Collectors;

public class UserMapper {

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

    public static UserResponseDTO toResponseDTO(UserEntity user) {
        UserResponseDTO dto = new UserResponseDTO();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setLastLogin(user.getLastLogin());
        dto.setActive(user.isActive());

        if (user.getAccounts() != null) {
            dto.setAccounts(
                    user.getAccounts()
                            .stream()
                            .map(a -> new OnboardedAccountDTO(
                                    a.getId(),
                                    a.getAccountId(),
                                    a.getAccountName()
                            ))
                            .collect(Collectors.toList())
            );
        }

        return dto;
    }
}
