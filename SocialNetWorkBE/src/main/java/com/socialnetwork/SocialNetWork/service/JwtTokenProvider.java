package com.socialnetwork.SocialNetWork.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtTokenProvider {
    private static final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512); // Key bí mật để tạo và xác minh token
    private static final long EXPIRATION_TIME = 2 * 60 * 60 * 1000; // Thời gian sống của token: 2 giờ (2 * 60 * 60 * 1000 milliseconds)

    public String generateToken(String username) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().build().parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
