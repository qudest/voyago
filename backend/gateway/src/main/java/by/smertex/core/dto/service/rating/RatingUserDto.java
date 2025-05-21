package by.smertex.core.dto.service.rating;

import io.swagger.v3.oas.annotations.media.Schema;

public record RatingUserDto(
        @Schema(description = "Id маршрута", example = "1") Long routeId,
        @Schema(description = "Id пользователя", example = "1") Long userId
) {
}
