package de.haw.busapp.controller;

import de.haw.busapp.model.User;
import de.haw.busapp.repository.UserRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Void> createUser(@RequestBody CreateUserRequest request) {
        User user = User.builder()
                .email(request.getEmail())
                .name(request.getName())
                .password(request.getPassword())
                .role(request.getRole())
                .build();
        user = userRepository.save(user);
        URI location = URI.create("/api/users/" + user.getId());
        return ResponseEntity.created(location).build();
    }

    @Data
    public static class CreateUserRequest {
        private String email;
        private String name;
        private String password;
        private User.Role role;
    }
}