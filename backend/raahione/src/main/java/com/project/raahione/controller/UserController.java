
package com.project.raahione.controller;
import com.project.raahione.dto.AuthResponse;
import com.project.raahione.dto.LoginRequest;
import com.project.raahione.dto.RegisterRequest;
import com.project.raahione.entity.User;
import com.project.raahione.service.UserService;
import org.springframework.web.bind.annotation.*;
import com.project.raahione.dto.UpdateProfileRequest;

import java.util.List;

@RestController
@RequestMapping("/users")

public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }
    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody LoginRequest request){
        return userService.login(request);
    }
    @DeleteMapping("/{userId}")
    public void deleteUser(
            @PathVariable Long userId) {

        userService.deleteUser(userId);
    }
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    @GetMapping("/{id}")
    public User getUser(
            @PathVariable Long id
    ) {
        return userService.getUserById(id);
    }
    @PutMapping("/{id}")
    public User updateProfile(
            @PathVariable Long id,
            @RequestBody UpdateProfileRequest request
    ) {
        return userService.updateProfile(id, request);
    }
}