package by.smertex.core.dto.service.rating;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Сущность средней оценки маршрута")
public record AverageRatingDto(
        @Schema(description = "Id маршрута", example = "1")
        Long routeId,
        @Schema(description = "Средняя оценка маршрута", example = "4.5")
        Float averageRating
) {
}
