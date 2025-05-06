package by.smertex.core.dto.service.auth.input;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Сущность подтверждения отправки кода")
public record PhoneCodeDto(
        @Schema(description = "Номер телефона", example = "78005553535", minLength = 11, maxLength = 11)
        String phoneNumber,

        @Schema(description = "Код подтверждения", example = "111111", minLength = 6, maxLength = 6)
        Integer code) {
}
