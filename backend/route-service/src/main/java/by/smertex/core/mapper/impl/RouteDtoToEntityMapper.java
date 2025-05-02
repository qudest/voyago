package by.smertex.core.mapper.impl;

import by.smertex.core.database.model.Route;
import by.smertex.core.database.model.RoutePoints;
import by.smertex.core.dto.input.RouteCreateOrUpdateDto;
import by.smertex.core.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class RouteDtoToEntityMapper implements Mapper<RouteCreateOrUpdateDto, Route> {

    @Override
    public Route map(RouteCreateOrUpdateDto from) {
        return Route.builder()
                .name(from.name())
                .createdBy(from.createdBy())
                .tags(from.tags())
                .routePoints(new RoutePoints(
                        from.routePoints().origin(),
                        from.routePoints().waypoints(),
                        from.routePoints().destination()
                ))
                .distance(from.distance())
                .duration(from.duration())
                .build();
    }

    @Override
    public Route map(RouteCreateOrUpdateDto from, Route to) {
        to.setName(from.name());
        to.setTags(from.tags());
        to.setRoutePoints(new RoutePoints(
                from.routePoints().origin(),
                from.routePoints().waypoints(),
                from.routePoints().destination()
        ));
        to.setDistance(from.distance());
        to.setDuration(from.duration());
        return to;
    }
}
