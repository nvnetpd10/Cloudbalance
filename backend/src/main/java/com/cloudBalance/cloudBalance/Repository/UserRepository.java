package com.cloudBalance.cloudBalance.Repository;


import com.cloudBalance.cloudBalance.Entity.UserEntity;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository <UserEntity , Long> {
}
