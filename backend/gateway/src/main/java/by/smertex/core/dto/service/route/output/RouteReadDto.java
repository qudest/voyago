package by.smertex.core.dto.service.route.output;

import by.smertex.core.dto.service.route.input.RoutePoints;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(description = "Сущность маршрута")
public record RouteReadDto(
        @Schema(description = "Id маршрута", example = "1")
        Long id,
        @Schema(description = "Название маршрута", example = "Мой маршрут")
        String name,
        @Schema(description = "Создатель маршрута", example = "1")
        Long createdBy,
        @Schema(description = "Теги маршрута")
        List<String> tags,
        @Schema(description = "Точки маршрута")
        RoutePoints routePoints,
        @Schema(description = "Дистанция маршрута (в метрах)", example = "5000")
        Long distance,
        @Schema(description = "Время в пути (в секундах)", example = "3600")
        Long duration,
        @Schema(description = "Средняя оценка маршрута", example = "4.5")
        Float rating
) {

}
