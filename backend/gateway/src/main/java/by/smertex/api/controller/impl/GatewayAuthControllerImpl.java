package by.smertex.api.controller.impl;

import by.smertex.api.controller.GatewayAuthController;
import by.smertex.core.client.AuthServiceClient;
import by.smertex.core.dto.service.auth.input.PhoneCodeDto;
import by.smertex.core.dto.service.auth.input.PhoneDto;
import by.smertex.core.dto.service.auth.output.TokenDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/security")
@RequiredArgsConstructor
public class GatewayAuthControllerImpl implements GatewayAuthController {

    private final AuthServiceClient authServiceClient;

    @PostMapping("/send")
    public ResponseEntity<Void> sendCodeForAccess(@RequestBody PhoneDto dto){
        return ResponseEntity.ok(
                authServiceClient.sendCodeForAccess(dto)
        );
    }

    @PostMapping
    public ResponseEntity<TokenDto> verifyCode(@RequestBody PhoneCodeDto dto){
        return ResponseEntity.ok(
                authServiceClient.verifyCode(dto)
        );
    }
}
