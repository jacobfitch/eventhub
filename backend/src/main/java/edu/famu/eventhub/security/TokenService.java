package edu.famu.eventhub.security;

import edu.famu.eventhub.model.AppUser;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenService {

    private final Map<String, AppUser> tokens = new ConcurrentHashMap<>();

    public String createToken(AppUser user) {
        String token = UUID.randomUUID().toString();
        tokens.put(token, user);
        return token;
    }

    public Optional<AppUser> getUserFromToken(String token) {
        return Optional.ofNullable(tokens.get(token));
    }
}