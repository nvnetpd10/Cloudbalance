package com.cloudBalance.cloudBalance.ServiceImpl;

import com.cloudBalance.cloudBalance.Entity.UserEntity;
import com.cloudBalance.cloudBalance.Repository.UserRepository;
import com.cloudBalance.cloudBalance.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private  UserRepository userRepository;
    @Override
    public List<UserEntity> getUsers() {

       List<UserEntity> list =  userRepository.findAll();
        return list;
    }
}
