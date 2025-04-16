package by.smertex.core.util.jwt.impl;

import by.smertex.core.util.jwt.JwtUtil;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Date;

@Getter
@Component
public class JwtRefreshUtil implements JwtUtil<String> {
    @Value("${jwt.refresh.secret}")
    private String secret;

    @Value("${jwt.refresh.secret}")
    private Duration lifetime;

    @Override
    public String generateToken(String phoneNumber) {
        Date issuedDate = new Date();
        Date expiredDate = new Date(issuedDate.getTime() + lifetime.toMillis());

        return jwtBuilder(secret, issuedDate, expiredDate)
                .setSubject(phoneNumber)
                .compact();
    }

    @Override
    public String getUsername(String token) {
        return getAllClaimsToken(token).getSubject();
    }

    @Override
    public String getRole(String token) {
        return null;
    }
}
