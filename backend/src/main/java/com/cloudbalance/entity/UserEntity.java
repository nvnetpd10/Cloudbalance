//package com.cloudbalance.entity;
//
//
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.Setter;
//import org.hibernate.annotations.DynamicUpdate;
//
//import java.time.Instant;
//import java.util.HashSet;
//import java.util.Set;
//
//@Entity
//@Getter
//@Setter
//@Table(name = "users")
//@DynamicUpdate
//public class UserEntity {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    private String firstName;
//    private String lastName;
//    private String email;
//    private String role;
//    private String password;
//    private Instant lastLogin=null;
//    private boolean active=true;
//
//    public UserEntity(){
//
//    }
//
//    public UserEntity(Long id, String firstName, String lastName, String email, String role, String password ,   Instant lastLogin, boolean active) {
//        this.id = id;
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.email = email;
//        this.role = role;
//        this.lastLogin = lastLogin;
//        this.active = active;
//        this.password = password;
//    }
//
//    @Override
//    public String toString() {
//        return "UserEntity{" +
//                "id=" + id +
//                ", firstName='" + firstName + '\'' +
//                ", lastName='" + lastName + '\'' +
//                ", email='" + email + '\'' +
//                ", role='" + role + '\'' +
//                ", password='" + password + '\'' +
//                ", lastLogin=" + lastLogin +
//                ", active=" + active +
//                '}';
//    }
//
//    @ManyToMany(cascade = CascadeType.ALL)
//    @JoinTable(
//            name = "user_accounts",
//            joinColumns = @JoinColumn(name = "user_id"),
//            inverseJoinColumns = @JoinColumn(name = "account_id")
//    )
//    private Set<OnboardedAccountEntity> accounts = new HashSet<>();
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
//    public String getPassword(){
//        return password;
//    }
//
//    public void setPassword(String password){
//        this.password = password;
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
//
//    public Set<OnboardedAccountEntity> getAccounts() {
//        return accounts;
//    }
//
//    public void setAccounts(Set<OnboardedAccountEntity> accounts) {
//        this.accounts = accounts;
//    }
//
//
//}


package com.cloudbalance.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(
        name = "users",
        indexes = {
                @Index(name = "idx_users_email", columnList = "email", unique = true)
        }
)
@Getter
@Setter
@NoArgsConstructor
@DynamicUpdate
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", length = 100)
    private String firstName;

    @Column(name = "last_name", length = 100)
    private String lastName;

    @Column(nullable = false, unique = true, length = 180)
    private String email;

    @Column(nullable = false, length = 50)
    private String role;

    @Column(nullable = false)
    private String password;

    @Column(name = "last_login")
    private Instant lastLogin;

    @Column(nullable = false)
    private boolean active = true;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_accounts",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "account_id")
    )
    private Set<OnboardedAccountEntity> accounts = new HashSet<>();

    @Override
    public String toString() {
        return "UserEntity{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", role='" + role + '\'' +
                ", lastLogin=" + lastLogin +
                ", active=" + active +
                '}';
    }
}
