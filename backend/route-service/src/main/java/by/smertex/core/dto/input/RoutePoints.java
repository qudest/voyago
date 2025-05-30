package by.smertex.core.dto.input;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record RoutePoints(
        @NotBlank String origin,
        @NotNull List<String> waypoints,
        @NotBlank String destination
) {
}
