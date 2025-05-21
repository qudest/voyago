package by.smertex.core.dto;

import jakarta.validation.constraints.NotNull;

public record RatingUserDto(
        @NotNull Long routeId,
        @NotNull Long userId
) {
}