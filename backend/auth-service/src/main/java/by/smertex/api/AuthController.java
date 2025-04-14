package by.smertex.api;

import by.smertex.core.dto.input.PhoneCodeDto;
import by.smertex.core.dto.input.PhoneNotificationDto;
import by.smertex.core.dto.input.RefreshTokenDto;
import by.smertex.core.dto.output.TokenDto;
import org.springframework.http.ResponseEntity;

public interface AuthController {
    ResponseEntity<Void> sendCodeForAccess(PhoneNotificationDto dto);

    ResponseEntity<TokenDto> verifyCode(PhoneCodeDto dto);

    ResponseEntity<TokenDto> updateToken(RefreshTokenDto dto);
}
