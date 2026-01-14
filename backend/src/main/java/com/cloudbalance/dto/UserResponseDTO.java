
package com.cloudbalance.dto;

import java.time.Instant;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class UserResponseDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private Instant lastLogin;
    private boolean active;

    private List<OnboardedAccountDTO> accounts;

    public UserResponseDTO() {}


}
