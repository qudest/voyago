package by.smertex.core.dto.service.auth.input;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Сущность телефона")
public record PhoneDto(
        @Schema(description = "Номер телефона", example = "78005553535", minLength = 11, maxLength = 11)
        String phoneNumber
) {
}
