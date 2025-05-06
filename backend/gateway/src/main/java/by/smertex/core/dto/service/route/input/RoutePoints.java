package by.smertex.core.dto.service.route.input;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(description = "Сущность для точек маршрута")
public record RoutePoints(
        @Schema(description = "Стартовая точка маршрута", example = "place_id:ChIJZ0xkTbNLtUYRJAm9yVu_ZkY")
        String origin,
        @Schema(description = "Промежуточные точки маршрута", example = "[\"place_id:ChIJZ0xkTbNLtUYRJAm9yVu_ZkY\", \"place_id:ChIJZ0xkTbNLtUYRJAm9yVu_ZkY\"]")
        List<String> waypoints,
        @Schema(description = "Конечная точка маршрута", example = "place_id:ChIJG1Nu1isvtUYR5FAPKrwasno")
        String destination
) {
}
