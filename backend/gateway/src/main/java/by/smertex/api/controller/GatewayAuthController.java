package by.smertex.api.controller;

import by.smertex.core.dto.service.auth.input.PhoneCodeDto;
import by.smertex.core.dto.service.auth.input.PhoneDto;
import by.smertex.core.dto.service.auth.output.TokenDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "Контроллер аутентификации", description = "Контроллер для работы с токенами")
public interface GatewayAuthController {
    @Operation(
            summary = "Отправить код на номер телефона",
            description = "Отправляет код подтверждения в сервис уведомлений"
    )
    ResponseEntity<Void> sendCodeForAccess(
            @Parameter(description = "Номер телефона", required = true)
            PhoneDto dto
    );

    @Operation(
            summary = "Подтвердить код",
            description = "Верифицирует код, отправленный на сервис уведомлений"
    )
    ResponseEntity<TokenDto> verifyCode(
            @Parameter(description = "Телефон и код", required = true)
            PhoneCodeDto dto
    );
}
