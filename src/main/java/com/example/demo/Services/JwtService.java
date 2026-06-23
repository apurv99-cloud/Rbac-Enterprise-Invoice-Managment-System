package com.example.demo.Services;

import com.example.demo.Entity.Users;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    private static final String SECRET =
            "MySuperSecretKeyMySuperSecretKeyMySuperSecretKey";

    private final SecretKey key =
            Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(
            Users user,
            String role
    ) {

        Map<String, Object> claims =
                new HashMap<>();

        claims.put("userId", user.getUser_id());
        claims.put("role", role);

        if (user.getOrganization() != null) {

            claims.put(
                    "organizationId",
                    user.getOrganization()
                            .getOrganizationId()
            );
        }

        return Jwts.builder()
                .claims(claims)
                .subject(user.getEmail())
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 1000L * 60 * 60 * 24
                        )
                )
                .signWith(
                        key,
                        SignatureAlgorithm.HS256
                )
                .compact();
    }

    public String extractEmail(
            String token
    ) {

        return extractClaims(token)
                .getSubject();
    }

    public Long extractUserId(
            String token
    ) {

        return extractClaims(token)
                .get("userId", Long.class);
    }

    public String extractRole(
            String token
    ) {

        return extractClaims(token)
                .get("role", String.class);
    }

    private Claims extractClaims(
            String token
    ) {

        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}