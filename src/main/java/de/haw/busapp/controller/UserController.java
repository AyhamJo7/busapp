package de.haw.busapp.controller;

import de.haw.busapp.model.User;
import de.haw.busapp.repository.UserRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

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
                .role(User.Role.USER)
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
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty() || !userOpt.get().getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Ungültige Anmeldedaten"));
        }

        User user = userOpt.get();

        // JSON-Response mit ID und Rolle
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("role", user.getRole().name()); // z. B. ADMIN oder USER

        return ResponseEntity.ok(response);
    }


    @Data
    public static class LoginRequest {
        private String email;
        private String password;
    }

}