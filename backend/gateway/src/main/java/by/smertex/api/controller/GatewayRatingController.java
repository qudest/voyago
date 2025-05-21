package by.smertex.api.controller;

import by.smertex.core.dto.service.rating.AverageRatingDto;
import by.smertex.core.dto.service.rating.RatingDto;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

@Tag(name = "Контроллер оценок", description = "Контроллер для работы с оценками")
public interface GatewayRatingController {

    @Operation(summary = "Получить рейтинг маршрута по id")
    ResponseEntity<AverageRatingDto> getRating(
            @Parameter(description = "Id маршрута", required = true) Long routeId
    );

    @Operation(summary = "Получить рейтинги для списка маршрутов")
    @Hidden
    ResponseEntity<Map<Long, Float>> getRatings(
            @Parameter(description = "Список c id маршрутов", required = true)
            List<Long> routeIds
    );

    @Operation(summary = "Получить рейтинг пользователя для определенного маршрута")
    ResponseEntity<RatingDto> getRatingByUserId(
            @Parameter(description = "Id маршрута")
            Long routeId,
            @Parameter(description = "Id пользователя")
            Long userId
    );

    @Operation(summary = "Оставить оценку")
    ResponseEntity<RatingDto> create(
            @Parameter(description = "Id пользователя", required = true)
            Long userId,
            @Parameter(description = "Оценка", required = true)
            RatingDto ratingDto
    );

    @Operation(summary = "Инвалидация и пересчет рейтинга")
    ResponseEntity<Void> update();
}
