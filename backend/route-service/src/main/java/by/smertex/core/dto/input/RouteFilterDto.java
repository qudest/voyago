package by.smertex.core.dto.input;

import java.util.List;

public record RouteFilterDto(
        String name,
        List<String> tags,
        RoutePoints routePoints,
        Long distanceFrom,
        Long distanceTo,
        Long durationFrom,
        Long durationTo,
        Float rating
) {
}
