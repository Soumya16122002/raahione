package com.project.raahione.service;

import com.project.raahione.dto.AuthResponse;
import com.project.raahione.dto.RegisterRequest;
import com.project.raahione.dto.UpdateProfileRequest;
import com.project.raahione.entity.User;
import com.project.raahione.repository.BookingRepository;
import com.project.raahione.repository.UserRepository;
import com.project.raahione.security.JwtService;
import org.springframework.stereotype.Service;


import com.project.raahione.dto.LoginRequest;
import java.util.Optional;
import java.util.List;




@Service
public class UserService {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final JwtService jwtService;

    public UserService(
            UserRepository userRepository,
            BookingRepository bookingRepository,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
        this.jwtService = jwtService;
    }

    public User register(RegisterRequest request) {
        if ("ADMIN".equals(request.getRole())) {
            throw new RuntimeException(
                    "Admin registration not allowed"
            );
        }
        if (request.getName() == null ||
                request.getName().trim().isEmpty()) {
            throw new RuntimeException("Name is required");
        }

        if (request.getEmail() == null ||
                request.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        if (request.getPassword() == null ||
                request.getPassword().trim().isEmpty()) {
            throw new RuntimeException("Password is required");
        }

        Optional<User> existingUser =
                userRepository.findByEmail(request.getEmail());

        if(existingUser.isPresent()){
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole());

        return userRepository.save(user);
    }

    public AuthResponse login(LoginRequest request) {

        if (
                "admin@gmail.com".equals(request.getEmail())
                        &&
                        "admin@123".equals(request.getPassword())
        ) {

            User admin = new User();

            admin.setId(0L);
            admin.setName("Admin");
            admin.setEmail("admin@gmail.com");
            admin.setRole("ADMIN");

            String token =
                    jwtService.generateToken(
                            admin.getEmail()
                    );

            return new AuthResponse(
                    token,
                    admin.getRole(),
                    admin.getId()
            );
        }

        Optional<User> user =
                userRepository.findByEmail(request.getEmail());

        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        if (!user.get().getPassword().equals(
                request.getPassword())) {

            throw new RuntimeException("Invalid password");
        }

        String token =
                jwtService.generateToken(
                        user.get().getEmail()
                );

        return new AuthResponse(
                token,
                user.get().getRole(),
                user.get().getId()
        );
    }
    public User getUserById(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public void deleteUser(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (!bookingRepository
                .findByUserId(userId)
                .isEmpty()) {

            throw new RuntimeException(
                    "Cannot delete user with booking history"
            );
        }

        userRepository.delete(user);

    }

    public User updateProfile(
            Long userId,
            UpdateProfileRequest request
    ) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setCity(request.getCity());
        user.setBio(request.getBio());

        return userRepository.save(user);
    }
}