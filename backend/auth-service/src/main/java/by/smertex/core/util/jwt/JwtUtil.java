package by.smertex.core.util.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.time.Duration;
import java.util.Date;

public interface JwtUtil<T> {
    String generateToken(T claims);

    String getUsername(String token);

    String getRole(String token);

    String getSecret();

    Duration getLifetime();

    default Claims getAllClaimsToken(String token) {
        return Jwts.parser()
                .setSigningKey(getSecret())
                .parseClaimsJws(token)
                .getBody();
    }

    default JwtBuilder jwtBuilder(String secret, Date issuedAt, Date expiredAt) {
        return Jwts.builder()
                .setIssuedAt(issuedAt)
                .setExpiration(expiredAt)
                .signWith(SignatureAlgorithm.HS512, secret);
    }
}
