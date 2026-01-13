package com.cloudbalance.service.impl;

import com.cloudbalance.dto.UserRequestDTO;
import com.cloudbalance.dto.UserResponseDTO;
import com.cloudbalance.entity.UserEntity;
import com.cloudbalance.mapper.UserMapper;
import com.cloudbalance.repository.UserRepository;
import com.cloudbalance.repository.OnboardedAccountRepository;
import com.cloudbalance.service.UserService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final OnboardedAccountRepository onboardedAccountRepository;


    public UserServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            OnboardedAccountRepository onboardedAccountRepository
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.onboardedAccountRepository = onboardedAccountRepository;
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
            throw new DataIntegrityViolationException("Email already exists");
        }

        UserEntity user = UserMapper.toEntity(dto);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setActive(true);

        if ("Customer".equalsIgnoreCase(dto.getRole())
                && dto.getAccountIds() != null
                && !dto.getAccountIds().isEmpty()) {

            var accounts = onboardedAccountRepository.findAllById(dto.getAccountIds());
            user.setAccounts(new HashSet<>(accounts));
        } else {
            user.getAccounts().clear();
        }

        return UserMapper.toResponseDTO(userRepository.save(user));
    }



    @Override
    public UserResponseDTO updateUser(Long id, UserRequestDTO dto) {

        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        userRepository.findByEmail(dto.getEmail())
                .filter(u -> !u.getId().equals(id))
                .ifPresent(u -> {
                    throw new DataIntegrityViolationException("Email already exists");
                });

        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setRole(dto.getRole());

        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        if ("Customer".equalsIgnoreCase(dto.getRole())) {

            if (dto.getAccountIds() != null) {
                user.getAccounts().clear();

                if (!dto.getAccountIds().isEmpty()) {
                    var accounts =
                            onboardedAccountRepository.findAllById(dto.getAccountIds());
                    user.getAccounts().addAll(accounts);
                }
            }

        } else {
            user.getAccounts().clear();
        }

        return UserMapper.toResponseDTO(userRepository.save(user));
    }


    @Override
    public UserResponseDTO getUserById(Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));

        user.getAccounts().size();

        return UserMapper.toResponseDTO(user);
    }


    @Override
    public UserResponseDTO patchUser(Long id, UserRequestDTO dto) {

        UserEntity user = userRepository.findById(id)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));

        if (dto.getFirstName() != null) user.setFirstName(dto.getFirstName());
        if (dto.getLastName() != null) user.setLastName(dto.getLastName());
        if (dto.getEmail() != null) user.setEmail(dto.getEmail());
        if (dto.getRole() != null) user.setRole(dto.getRole());
        if (dto.getPassword() != null)
            user.setPassword(passwordEncoder.encode(dto.getPassword()));

        return UserMapper.toResponseDTO(userRepository.save(user));
    }

    @Override
    public UserResponseDTO updateUserActiveStatus(Long id, boolean active) {

        UserEntity user = userRepository.findById(id)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));

        user.setActive(active);
        return UserMapper.toResponseDTO(userRepository.save(user));
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UsernameNotFoundException("User not found");
        }
        userRepository.deleteById(id);
    }
}
