//package com.cloudbalance.service.impl;
//
//import com.cloudbalance.dto.UserRequestDTO;
//import com.cloudbalance.dto.UserResponseDTO;
//import com.cloudbalance.entity.UserEntity;
//import com.cloudbalance.mapper.UserMapper;
//import com.cloudbalance.repository.UserRepository;
//import com.cloudbalance.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class UserServiceImpl implements UserService {
//
//    @Autowired
//    private final UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    public UserServiceImpl(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @Override
//    public List<UserResponseDTO> getUsers() {
//        return userRepository.findAll()
//                .stream()
//                .map(UserMapper::toResponseDTO)
//                .toList();
//    }
//
//    @Override
//    public UserResponseDTO addUser(UserRequestDTO dto) {
//        // Check if the email already exists
//        if (userRepository.existsByEmail(dto.getEmail())) {
//            throw new RuntimeException("Email already exists.");
//        }
//
//        // Convert DTO to entity and encode the password
//        UserEntity user = UserMapper.toEntity(dto);
//        user.setPassword(passwordEncoder.encode(dto.getPassword())); // Encode password before saving
//
//        // Save the user and return the response DTO
//        UserEntity savedUser = userRepository.save(user);
//        return UserMapper.toResponseDTO(savedUser);
//    }
//
//    @Override
//    public UserResponseDTO updateUser(Long id, UserRequestDTO dto) {
//        // Find the existing user or throw exception if not found
//        UserEntity existingUser = userRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("User not found."));
//
//        // Check if the email is already taken by another user
//        userRepository.findByEmail(dto.getEmail())
//                .filter(u -> !u.getId().equals(id))
//                .ifPresent(u -> {
//                    throw new RuntimeException("Email already exists.");
//                });
//
//        // Update user details
//        existingUser.setFirstName(dto.getFirstName());
//        existingUser.setLastName(dto.getLastName());
//        existingUser.setEmail(dto.getEmail());
//        existingUser.setRole(dto.getRole());
//
//        // Update password if provided
//        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
//            existingUser.setPassword(passwordEncoder.encode(dto.getPassword()));
//        }
//
//        // Save and return the updated user
//        UserEntity updatedUser = userRepository.save(existingUser);
//        return UserMapper.toResponseDTO(updatedUser);
//    }
//
//    @Override
//    public UserResponseDTO getUserById(Long id) {
//        // Find the user by id or throw exception if not found
//        UserEntity user = userRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("User not found."));
//        return UserMapper.toResponseDTO(user);
//    }
//
//    @Override
//    public UserResponseDTO patchUser(Long id, UserRequestDTO dto) {
//        // Find the user by id or throw exception if not found
//        UserEntity user = userRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("User not found."));
//
//        // Update only the non-null fields in the DTO
//        if (dto.getFirstName() != null) {
//            user.setFirstName(dto.getFirstName());
//        }
//        if (dto.getLastName() != null) {
//            user.setLastName(dto.getLastName());
//        }
//        if (dto.getEmail() != null) {
//            // Check if the email is already taken by another user
//            userRepository.findByEmail(dto.getEmail())
//                    .filter(u -> !u.getId().equals(id))
//                    .ifPresent(u -> {
//                        throw new RuntimeException("Email already exists.");
//                    });
//            user.setEmail(dto.getEmail());
//        }
//        if (dto.getRole() != null) {
//            user.setRole(dto.getRole());
//        }
//        if (dto.getPassword() != null) {
//            user.setPassword(passwordEncoder.encode(dto.getPassword()));
//        }
//
//        // Save and return the updated user
//        UserEntity updatedUser = userRepository.save(user);
//        return UserMapper.toResponseDTO(updatedUser);
//    }
//
//    @Override
//    public void deleteUser(Long id) {
//        // Check if user exists, otherwise throw exception
//        if (!userRepository.existsById(id)) {
//            throw new RuntimeException("User not found.");
//        }
//        // Delete the user
//        userRepository.deleteById(id);
//    }
//}


//package com.cloudbalance.service.impl;
//
//import com.cloudbalance.dto.UserRequestDTO;
//import com.cloudbalance.dto.UserResponseDTO;
//import com.cloudbalance.entity.UserEntity;
//import com.cloudbalance.mapper.UserMapper;
//import com.cloudbalance.repository.UserRepository;
//import com.cloudbalance.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class UserServiceImpl implements UserService {
//
//    @Autowired
//    private final UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    public UserServiceImpl(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @Override
//    public List<UserResponseDTO> getUsers() {
//        return userRepository.findAll()
//                .stream()
//                .map(UserMapper::toResponseDTO)
//                .toList();
//    }
//
//    @Override
//    public UserResponseDTO addUser(UserRequestDTO dto) {
//        if (userRepository.existsByEmail(dto.getEmail())) {
//            throw new RuntimeException("Email already exists.");
//        }
//
//        UserEntity user = UserMapper.toEntity(dto);
//        user.setPassword(passwordEncoder.encode(dto.getPassword()));
//        user.setActive(true); // default active
//
//        UserEntity savedUser = userRepository.save(user);
//        return UserMapper.toResponseDTO(savedUser);
//    }
//
//    @Override
//    public UserResponseDTO updateUser(Long id, UserRequestDTO dto) {
//        UserEntity existingUser = userRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("User not found."));
//
//        userRepository.findByEmail(dto.getEmail())
//                .filter(u -> !u.getId().equals(id))
//                .ifPresent(u -> {
//                    throw new RuntimeException("Email already exists.");
//                });
//
//        existingUser.setFirstName(dto.getFirstName());
//        existingUser.setLastName(dto.getLastName());
//        existingUser.setEmail(dto.getEmail());
//        existingUser.setRole(dto.getRole());
//
//        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
//            existingUser.setPassword(passwordEncoder.encode(dto.getPassword()));
//        }
//
//        UserEntity updatedUser = userRepository.save(existingUser);
//        return UserMapper.toResponseDTO(updatedUser);
//    }
//
//    @Override
//    public UserResponseDTO getUserById(Long id) {
//        UserEntity user = userRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("User not found."));
//        return UserMapper.toResponseDTO(user);
//    }
//
//    @Override
//    public UserResponseDTO patchUser(Long id, UserRequestDTO dto) {
//        UserEntity user = userRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("User not found."));
//
//        if (dto.getFirstName() != null) user.setFirstName(dto.getFirstName());
//        if (dto.getLastName() != null) user.setLastName(dto.getLastName());
//        if (dto.getEmail() != null) user.setEmail(dto.getEmail());
//        if (dto.getRole() != null) user.setRole(dto.getRole());
//        if (dto.getPassword() != null) {
//            user.setPassword(passwordEncoder.encode(dto.getPassword()));
//        }
//
//        UserEntity updatedUser = userRepository.save(user);
//        return UserMapper.toResponseDTO(updatedUser);
//    }
//
//    // ✅ NEW METHOD (ACTIVE / INACTIVE)
//    @Override
//    public UserResponseDTO updateUserActiveStatus(Long id, boolean active) {
//        UserEntity user = userRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("User not found."));
//
//        user.setActive(active);
//
//        UserEntity updatedUser = userRepository.save(user);
//        return UserMapper.toResponseDTO(updatedUser);
//    }
//
//    @Override
//    public void deleteUser(Long id) {
//        if (!userRepository.existsById(id)) {
//            throw new RuntimeException("User not found.");
//        }
//        userRepository.deleteById(id);
//    }
//}

package com.cloudbalance.service.impl;

import com.cloudbalance.dto.UserRequestDTO;
import com.cloudbalance.dto.UserResponseDTO;
import com.cloudbalance.entity.UserEntity;
import com.cloudbalance.mapper.UserMapper;
import com.cloudbalance.repository.UserRepository;
import com.cloudbalance.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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
            throw new RuntimeException("Email already exists.");
        }

        UserEntity user = UserMapper.toEntity(dto);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setActive(true);

        return UserMapper.toResponseDTO(userRepository.save(user));
    }

    @Override
    public UserResponseDTO updateUser(Long id, UserRequestDTO dto) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found."));

        userRepository.findByEmail(dto.getEmail())
                .filter(u -> !u.getId().equals(id))
                .ifPresent(u -> {
                    throw new RuntimeException("Email already exists.");
                });

        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setRole(dto.getRole());

        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        return UserMapper.toResponseDTO(userRepository.save(user));
    }

    @Override
    public UserResponseDTO getUserById(Long id) {
        return userRepository.findById(id)
                .map(UserMapper::toResponseDTO)
                .orElseThrow(() -> new RuntimeException("User not found."));
    }

    @Override
    public UserResponseDTO patchUser(Long id, UserRequestDTO dto) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found."));

        if (dto.getFirstName() != null) user.setFirstName(dto.getFirstName());
        if (dto.getLastName() != null) user.setLastName(dto.getLastName());
        if (dto.getEmail() != null) user.setEmail(dto.getEmail());
        if (dto.getRole() != null) user.setRole(dto.getRole());
        if (dto.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        return UserMapper.toResponseDTO(userRepository.save(user));
    }

    @Override
    public UserResponseDTO updateUserActiveStatus(Long id, boolean active) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found."));

        user.setActive(active);
        return UserMapper.toResponseDTO(userRepository.save(user));
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found.");
        }
        userRepository.deleteById(id);
    }
}






