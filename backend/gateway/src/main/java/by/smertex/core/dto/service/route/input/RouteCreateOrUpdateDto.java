package by.smertex.core.dto.service.route.input;

import by.smertex.core.dto.service.route.Tag;

import java.util.List;

public record RouteCreateOrUpdateDto(
        String name,
        Long createdBy,
        List<Tag> tags,
        RoutePoints routePoints,
        Long distance,
        Long duration
) {
}
