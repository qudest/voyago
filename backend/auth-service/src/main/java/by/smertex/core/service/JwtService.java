package by.smertex.core.service;

import by.smertex.core.dto.input.PhoneCodeDto;
import by.smertex.core.dto.input.RefreshTokenDto;
import by.smertex.core.dto.output.JwtClaims;
import by.smertex.core.dto.output.TokenDto;

public interface JwtService {
    TokenDto generateToken(PhoneCodeDto dto);

    JwtClaims validateToken(String token);

//    TokenDto updateToken(RefreshTokenDto dto);
//
//    void removeToken(String phoneNumber);
}