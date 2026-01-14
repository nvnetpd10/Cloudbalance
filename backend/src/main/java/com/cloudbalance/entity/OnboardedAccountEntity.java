package com.cloudbalance.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(
        name = "onboarded_accounts",
        indexes = {
                @Index(name = "idx_onboarded_account_id", columnList = "account_id", unique = true),
                @Index(name = "idx_onboarded_arn", columnList = "arn", unique = true)
        }
)
@Getter
@Setter
@NoArgsConstructor
@DynamicUpdate
public class OnboardedAccountEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Account ID is required")
    @Pattern(regexp = "^[0-9]{12}$", message = "Account ID must be exactly 12 digits")
    @Column(name = "account_id", nullable = false, unique = true, length = 12)
    private String accountId;

    @NotBlank(message = "Account name is required")
    @Size(max = 150, message = "Account name must be <= 150 characters")
    @Column(name = "account_name", nullable = false, length = 150)
    private String accountName;

    @NotBlank(message = "ARN is required")
    @Pattern(
            regexp = "^arn:aws:iam::[0-9]{12}.*$",
            message = "ARN must start with arn:aws:iam:: followed by a 12-digit account id"
    )
    @Column(name = "arn", nullable = false, unique = true, length = 300)
    private String arn;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @ManyToMany(mappedBy = "accounts", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<UserEntity> users = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = Instant.now();
        }
    }

    @Override
    public String toString() {
        return "OnboardedAccountEntity{" +
                "id=" + id +
                ", accountId='" + accountId + '\'' +
                ", accountName='" + accountName + '\'' +
                ", arn='" + arn + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
