package edu.famu.eventhub.controller;

import edu.famu.eventhub.dto.AuthResponse;
import edu.famu.eventhub.dto.LoginRequest;
import edu.famu.eventhub.dto.RegisterRequest;
import edu.famu.eventhub.model.AppUser;
import edu.famu.eventhub.repository.AppUserRepository;
import edu.famu.eventhub.security.TokenService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public AuthController(AppUserRepository appUserRepository,
                          PasswordEncoder passwordEncoder,
                          TokenService tokenService) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        if (appUserRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        AppUser user = new AppUser(
                request.getName(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword())
        );

        AppUser savedUser = appUserRepository.save(user);
        String token = tokenService.createToken(savedUser);

        return new AuthResponse(token, savedUser.getEmail(), savedUser.getName());
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        AppUser user = appUserRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = tokenService.createToken(user);

        return new AuthResponse(token, user.getEmail(), user.getName());
    }
}