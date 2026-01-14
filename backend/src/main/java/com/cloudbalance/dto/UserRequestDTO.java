package com.cloudbalance.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.List;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.Pattern;


@Getter
@Setter

public class UserRequestDTO {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Role is required")
    @Pattern(
            regexp = "^(?i)(ADMIN|CUSTOMER|READONLY)$",
            message = "Role must be ADMIN, CUSTOMER, or READONLY"
    )
    private String role;

    private String password;
    private List<Long> accountIds;



    public UserRequestDTO() {}


}
