package by.smertex.core.dto.input;

import by.smertex.core.database.model.Tag;

import java.util.List;

public record RouteFilterDto(
        String name,
        List<Tag>tags,
        String origin,
        List<String> waypoints,
        String destination,
        Long distanceFrom,
        Long distanceTo,
        Long durationFrom,
        Long durationTo,
        Float rating
) {
}
