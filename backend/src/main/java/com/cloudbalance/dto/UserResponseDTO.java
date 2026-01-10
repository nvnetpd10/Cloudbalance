//package com.cloudbalance.dto;
//
//
//import java.time.Instant;
//
//public class UserResponseDTO {
//
//    private Long id;
//    private String firstName;
//    private String lastName;
//    private String email;
//    private String role;
//    private String password;
//    private Instant lastLogin;
//    private boolean active;
//
//    public UserResponseDTO() {}
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getFirstName() {
//        return firstName;
//    }
//
//    public void setFirstName(String firstName) {
//        this.firstName = firstName;
//    }
//
//    public String getLastName() {
//        return lastName;
//    }
//
//    public void setLastName(String lastName) {
//        this.lastName = lastName;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getRole() {
//        return role;
//    }
//
//    public void setRole(String role) {
//        this.role = role;
//    }
//
//    public Instant getLastLogin() {
//        return lastLogin;
//    }
//
//    public void setLastLogin(Instant lastLogin) {
//        this.lastLogin = lastLogin;
//    }
//
//    public boolean isActive() {
//        return active;
//    }
//
//    public void setActive(boolean active) {
//        this.active = active;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//}
//


package com.cloudbalance.dto;

import java.time.Instant;
import java.util.List;

public class UserResponseDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private Instant lastLogin;
    private boolean active;

    // ✅ NEW
    private List<OnboardedAccountDTO> accounts;

    public UserResponseDTO() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Instant getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(Instant lastLogin) {
        this.lastLogin = lastLogin;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public List<OnboardedAccountDTO> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<OnboardedAccountDTO> accounts) {
        this.accounts = accounts;
    }
}
