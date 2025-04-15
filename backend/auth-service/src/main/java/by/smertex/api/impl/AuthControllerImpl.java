package by.smertex.api.impl;

import by.smertex.api.AuthController;
import by.smertex.core.dto.input.PhoneCodeDto;
import by.smertex.core.dto.input.PhoneNotificationDto;
import by.smertex.core.dto.input.RefreshTokenDto;
import by.smertex.core.dto.output.TokenDto;
import by.smertex.core.service.JwtService;
import by.smertex.core.service.SendCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/security")
@RequiredArgsConstructor
public class AuthControllerImpl implements AuthController {

    private final SendCodeService sendCodeService;

    private final JwtService jwtService;

    public ResponseEntity<Void> sendCodeForAccess(PhoneNotificationDto dto) {
        sendCodeService.send(dto);
        return ResponseEntity.ok()
                .build();
    }


    public ResponseEntity<TokenDto> verifyCode(PhoneCodeDto dto) {
        return ResponseEntity.ok(
                jwtService.generateToken(dto)
        );
    }


    public ResponseEntity<TokenDto> updateToken(RefreshTokenDto dto) {
        return ResponseEntity.ok(
                jwtService.updateToken(dto)
        );
    }
}
