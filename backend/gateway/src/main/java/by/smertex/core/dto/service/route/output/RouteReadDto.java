package by.smertex.core.dto.service.route.output;

import by.smertex.core.dto.service.route.Tag;
import by.smertex.core.dto.service.route.input.RoutePoints;

import java.util.List;

public record RouteReadDto(
        Long id,
        String name,
        Long createdBy,
        List<Tag> tags,
        RoutePoints routePoints,
        Long distance,
        Long duration,
        Float rating
) {

}
