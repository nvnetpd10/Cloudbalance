package com.cloudBalance.cloudBalance.Service;

import com.cloudBalance.cloudBalance.Entity.UserEntity;
import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService {

    public List<UserEntity> getUsers();

}
