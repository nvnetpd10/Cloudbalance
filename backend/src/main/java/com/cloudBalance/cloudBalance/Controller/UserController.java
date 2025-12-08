package com.cloudBalance.cloudBalance.Controller;


import com.cloudBalance.cloudBalance.Entity.UserEntity;
import com.cloudBalance.cloudBalance.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLOutput;
import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins="*")
public class UserController {

    @Autowired
    private UserService userService;
    @GetMapping("/getUsers")
    public List<UserEntity> getUsers(){

        List<UserEntity> list = userService.getUsers();
        return list;
    }
}
