package by.smertex.core.dto.input;

import by.smertex.core.database.model.Tag;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.List;

public record RouteCreateOrUpdateDto(
        @NotBlank String name,
        @NotNull Long createdBy,
        @NotNull @NotEmpty List<Tag> tags,
        @NotNull RoutePoints routePoints,
        @NotNull @Positive Long distance,
        @NotNull @Positive Long duration
) {
}
