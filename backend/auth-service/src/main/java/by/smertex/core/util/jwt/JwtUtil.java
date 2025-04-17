package by.smertex.core.util.jwt;

import by.smertex.core.exception.GenerateJwtException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.HttpStatus;

import javax.crypto.SecretKey;
import java.time.Duration;
import java.util.Date;

public interface JwtUtil<T> {
    String generateToken(T claims);

    String getUsername(String token);

    String getRole(String token);

    String getSecret();

    Duration getLifetime();

    default SecretKey getSecretKey() {
        byte[] keyBytes = Decoders.BASE64.decode(getSecret());
        return Keys.hmacShaKeyFor(keyBytes);
    }

    default Claims getAllClaimsToken(String token) {
        return Jwts.parser()
                .verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    default JwtBuilder jwtBuilder(Date issuedAt, Date expiredAt) {
        return Jwts.builder()
                .issuedAt(issuedAt)
                .expiration(expiredAt)
                .signWith(getSecretKey());
    }

    default boolean validateToken(String token) {
        try {
            SecretKey key = getSecretKey();
            Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
            return true;
        } catch(SecurityException | MalformedJwtException e) {
            throw new GenerateJwtException("JWT was expired or incorrect", HttpStatus.BAD_REQUEST.value());
        } catch (ExpiredJwtException e) {
            throw new GenerateJwtException("Expired JWT token", HttpStatus.BAD_REQUEST.value());
        } catch (UnsupportedJwtException e) {
            throw new GenerateJwtException("Unsupported JWT token", HttpStatus.BAD_REQUEST.value());
        } catch (IllegalArgumentException e) {
            throw new GenerateJwtException("JWT token compact of handler are invalid", HttpStatus.BAD_REQUEST.value());
        }
    }
}
