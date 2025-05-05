package by.smertex.core.dto.service.route.input;

import by.smertex.core.dto.service.route.Tag;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(description = "Сущность для создания/обновления маршрута")
public record RouteCreateOrUpdateDto(
        @Schema(description = "Название маршрута", example = "Мой маршрут")
        String name,
        @Schema(description = "Создатель маршрута", example = "1")
        Long createdBy,
        @Schema(description = "Теги маршрута")
        List<Tag> tags,
        @Schema(description = "Точки маршрута")
        RoutePoints routePoints,
        @Schema(description = "Дистанция маршрута (в метрах)", example = "5000")
        Long distance,
        @Schema(description = "Время в пути (в секундах)", example = "3600")
        Long duration
) {
}
