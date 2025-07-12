package de.haw.busapp.controller;

import de.haw.busapp.model.User;
import de.haw.busapp.repository.UserRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
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
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty() || !userOpt.get().getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(401).body("Ungültige Anmeldedaten");
        }
        User user = userOpt.get();


        // Erfolg: schick die User-ID oder einen Token zurück
        return ResponseEntity.ok("Anmeldung erfolgreich! UserID: " + user.getId());
    }

    @Data
    public static class LoginRequest {
        private String email;
        private String password;
    }

}