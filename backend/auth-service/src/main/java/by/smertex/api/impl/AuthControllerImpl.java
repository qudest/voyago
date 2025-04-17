package by.smertex.api.impl;

import by.smertex.api.AuthController;
import by.smertex.core.dto.input.PhoneCodeDto;
import by.smertex.core.dto.input.PhoneDto;
import by.smertex.core.dto.input.RefreshTokenDto;
import by.smertex.core.dto.output.TokenDto;
import by.smertex.core.service.JwtService;
import by.smertex.core.service.SendCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/security")
@RequiredArgsConstructor
public class AuthControllerImpl implements AuthController {

    private final SendCodeService sendCodeService;

    private final JwtService jwtService;

    @PostMapping("/send")
    public ResponseEntity<Void> sendCodeForAccess(@RequestBody PhoneDto dto) {
        sendCodeService.send(dto);
        return ResponseEntity.ok()
                .build();
    }

    @PostMapping
    public ResponseEntity<TokenDto> verifyCode(@RequestBody PhoneCodeDto dto) {
        return ResponseEntity.ok(
                jwtService.generateToken(dto)
        );
    }

    @PutMapping
    public ResponseEntity<TokenDto> updateToken(@RequestBody RefreshTokenDto dto) {
        return ResponseEntity.ok(
                jwtService.updateToken(dto)
        );
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteToken(@RequestParam PhoneDto dto) {
        jwtService.removeToken(dto.phoneNumber());
        return ResponseEntity
                .noContent()
                .build();
    }
}
