package by.smertex.core.mapper.impl;

import by.smertex.core.database.model.Route;
import by.smertex.core.dto.input.RoutePoints;
import by.smertex.core.dto.output.RouteReadDto;
import by.smertex.core.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class RouteToDtoMapper implements Mapper<Route, RouteReadDto> {

    @Override
    public RouteReadDto map(Route from) {
        return RouteReadDto.builder()
                .id(from.getId())
                .name(from.getName())
                .createdBy(from.getCreatedBy())
                .tags(from.getTags())
                .routePoints(new RoutePoints(
                        from.getRoutePoints().getOrigin(),
                        from.getRoutePoints().getWaypoints(),
                        from.getRoutePoints().getDestination()
                ))
                .distance(from.getDistance())
                .duration(from.getDuration())
                .build();
    }
}
