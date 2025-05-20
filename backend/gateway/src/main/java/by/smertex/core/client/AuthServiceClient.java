package by.smertex.core.client;

import by.smertex.core.dto.service.auth.input.PhoneCodeDto;
import by.smertex.core.dto.service.auth.input.PhoneDto;
import by.smertex.core.dto.service.auth.output.JwtClaims;
import by.smertex.core.dto.service.auth.output.TokenDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "auth-service")
public interface AuthServiceClient {

    @PostMapping("/api/security/send")
    Void sendCodeForAccess(@RequestBody PhoneDto dto);

    @PostMapping("/api/security")
    TokenDto verifyCode(@RequestBody PhoneCodeDto dto);

    @GetMapping("/api/security")
    JwtClaims validateToken(@RequestParam("accessToken") String accessToken);
}
