package com.cloudbalance.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

import java.time.Instant;

@Entity
@Table(
        name = "refresh_tokens",
        indexes = {
                @Index(name = "idx_refresh_token_token", columnList = "token", unique = true),
                @Index(name = "idx_refresh_token_user_id", columnList = "user_id", unique = true)
        }
)
@Getter
@Setter
@NoArgsConstructor
@DynamicUpdate
public class RefreshTokenEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 200)
    private String token;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private UserEntity user;

    @Column(name = "expiry_date", nullable = false)
    private Instant expiryDate;

    @Override
    public String toString() {
        return "RefreshTokenEntity{" +
                "id=" + id +
                ", token='" + (token == null ? null : "****") + '\'' +
                ", userId=" + (user == null ? null : user.getId()) +
                ", expiryDate=" + expiryDate +
                '}';
    }
}
