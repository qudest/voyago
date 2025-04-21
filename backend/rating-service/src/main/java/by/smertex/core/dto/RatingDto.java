package by.smertex.core.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record RatingDto(
        Long routeId,
        @Min(1) @Max(5)
        Integer rating
) {
}
