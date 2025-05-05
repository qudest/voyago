package by.smertex.api;

import by.smertex.core.dto.input.PhoneCodeDto;
import by.smertex.core.dto.input.PhoneDto;
import by.smertex.core.dto.output.JwtClaims;
import by.smertex.core.dto.output.TokenDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;

public interface AuthController {
    ResponseEntity<Void> sendCodeForAccess(@Valid PhoneDto dto);

    ResponseEntity<TokenDto> verifyCode(@Valid PhoneCodeDto dto);

    ResponseEntity<JwtClaims> validateToken(TokenDto dto);
}
