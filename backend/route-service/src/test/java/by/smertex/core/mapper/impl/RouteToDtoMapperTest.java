package by.smertex.core.mapper.impl;

import by.smertex.core.database.model.Route;
import by.smertex.core.database.model.RoutePoints;
import by.smertex.core.database.model.Tag;
import by.smertex.core.dto.output.RouteReadDto;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class RouteToDtoMapperTest {

    private final RouteToDtoMapper mapper = new RouteToDtoMapper();

    @Test
    void map_CreatesDtoFromRouteEntity() {
        Route route = Route.builder()
                .id(10L)
                .name("TestRoute")
                .createdBy(2L)
                .tags(List.of(Tag.PARK, Tag.CAFE))
                .routePoints(new RoutePoints("O", List.of("W1", "W2"), "D"))
                .distance(123L)
                .duration(55L)
                .build();

        RouteReadDto dto = mapper.map(route);

        assertThat(dto.getId()).isEqualTo(10L);
        assertThat(dto.getName()).isEqualTo("TestRoute");
        assertThat(dto.getCreatedBy()).isEqualTo(2L);
        assertThat(dto.getTags()).containsExactly(Tag.PARK, Tag.CAFE);
        assertThat(dto.getRoutePoints().origin()).isEqualTo("O");
        assertThat(dto.getRoutePoints().waypoints()).containsExactly("W1", "W2");
        assertThat(dto.getRoutePoints().destination()).isEqualTo("D");
        assertThat(dto.getDistance()).isEqualTo(123L);
        assertThat(dto.getDuration()).isEqualTo(55L);
    }

    @Test
    void map_CreatesDtoWithEmptyWaypoints() {
        Route route = Route.builder()
                .id(11L)
                .name("NoWaypoints")
                .createdBy(3L)
                .tags(List.of(Tag.BAR))
                .routePoints(new RoutePoints("Start", List.of(), "End"))
                .distance(50L)
                .duration(20L)
                .build();

        RouteReadDto dto = mapper.map(route);

        assertThat(dto.getRoutePoints().waypoints()).isEmpty();
    }
}