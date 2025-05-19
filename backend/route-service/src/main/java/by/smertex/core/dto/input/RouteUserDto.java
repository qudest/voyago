package by.smertex.core.dto.input;

import jakarta.validation.constraints.NotNull;

public record RouteUserDto(
        @NotNull Long routeId,
        @NotNull Long userId
) {
}
