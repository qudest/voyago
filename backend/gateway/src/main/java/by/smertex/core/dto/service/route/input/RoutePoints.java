package by.smertex.core.dto.service.route.input;

import java.util.List;

public record RoutePoints(
        String origin,
        List<String> waypoints,
        String destination
) {
}
