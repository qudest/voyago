package by.smertex.core.mapper.impl;

import by.smertex.core.database.model.Route;
import by.smertex.core.database.model.RoutePoints;
import by.smertex.core.database.model.Tag;
import by.smertex.core.dto.input.RouteCreateOrUpdateDto;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class RouteDtoToEntityMapperTest {

    private final RouteDtoToEntityMapper mapper = new RouteDtoToEntityMapper();

    @Test
    void map_CreatesRouteEntityFromDto() {
        RouteCreateOrUpdateDto dto = new RouteCreateOrUpdateDto(
                "Test",
                1L,
                List.of(Tag.PARK, Tag.CAFE),
                new by.smertex.core.dto.input.RoutePoints("A", List.of("B", "C"), "D"),
                100L,
                60L
        );

        Route route = mapper.map(dto);

        assertThat(route.getName()).isEqualTo("Test");
        assertThat(route.getCreatedBy()).isEqualTo(1L);
        assertThat(route.getTags()).containsExactly(Tag.PARK, Tag.CAFE);
        assertThat(route.getRoutePoints().getOrigin()).isEqualTo("A");
        assertThat(route.getRoutePoints().getWaypoints()).containsExactly("B", "C");
        assertThat(route.getRoutePoints().getDestination()).isEqualTo("D");
        assertThat(route.getDistance()).isEqualTo(100L);
        assertThat(route.getDuration()).isEqualTo(60L);
    }

    @Test
    void map_UpdatesExistingRouteEntity() {
        RouteCreateOrUpdateDto dto = new RouteCreateOrUpdateDto(
                "Updated",
                2L,
                List.of(Tag.BAR),
                new by.smertex.core.dto.input.RoutePoints("X", List.of(), "Y"),
                200L,
                120L
        );

        Route route = Route.builder()
                .id(5L)
                .name("Old")
                .createdBy(2L)
                .tags(List.of(Tag.SHOPPING))
                .routePoints(new RoutePoints("O", List.of("Z"), "P"))
                .distance(1L)
                .duration(1L)
                .build();

        Route updated = mapper.map(dto, route);

        assertThat(updated.getName()).isEqualTo("Updated");
        assertThat(updated.getTags()).containsExactly(Tag.BAR);
        assertThat(updated.getRoutePoints().getOrigin()).isEqualTo("X");
        assertThat(updated.getRoutePoints().getWaypoints()).isEmpty();
        assertThat(updated.getRoutePoints().getDestination()).isEqualTo("Y");
        assertThat(updated.getDistance()).isEqualTo(200L);
        assertThat(updated.getDuration()).isEqualTo(120L);
        // id и createdBy не должны меняться
        assertThat(updated.getId()).isEqualTo(5L);
        assertThat(updated.getCreatedBy()).isEqualTo(2L);
    }
}