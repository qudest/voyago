package by.smertex.core.dto.service.auth.output;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Сущность токена")
public record TokenDto(
        @Schema(description = "Access токен")
        String accessToken
) {
}
