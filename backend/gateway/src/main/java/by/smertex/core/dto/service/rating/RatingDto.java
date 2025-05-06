package by.smertex.core.dto.service.rating;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@Schema(description = "Сущность оценки маршрута")
public record RatingDto(
        @Schema(description = "Id маршрута", example = "1")
        Long routeId,
        @Schema(description = "Оценка маршрута (1-5)", example = "5")
        @Min(1)
        @Max(5)
        Integer rating
) {
}
