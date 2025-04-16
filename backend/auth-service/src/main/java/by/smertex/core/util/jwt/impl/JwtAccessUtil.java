package by.smertex.core.util.jwt.impl;

import by.smertex.core.dto.input.AccountReadDto;
import by.smertex.core.util.jwt.JwtUtil;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Getter
@Component
public class JwtAccessUtil implements JwtUtil<AccountReadDto> {
    @Value("${jwt.access.secret}")
    private String secret;

    @Value("${jwt.access.lifetime}")
    private Duration lifetime;

    public String generateToken(AccountReadDto account) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", account.role());
        Date issuedDate = new Date();
        Date expiredDate = new Date(issuedDate.getTime() + lifetime.toMillis());

        return jwtBuilder(secret, issuedDate, expiredDate)
                .setClaims(claims)
                .setSubject(account.phoneNumber())
                .compact();
    }

    public String getUsername(String token) {
        return getAllClaimsToken(token).getSubject();
    }

    public String getRole(String token) {
        return getAllClaimsToken(token).get("role").toString();
    }
}
