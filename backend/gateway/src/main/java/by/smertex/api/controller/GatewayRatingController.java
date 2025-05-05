package by.smertex.api.controller;

import by.smertex.core.client.RatingServiceClient;
import by.smertex.core.dto.service.rating.AverageRatingDto;
import by.smertex.core.dto.service.rating.RatingDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ratings")
@RequiredArgsConstructor
@Tag(name = "Контроллер оценок", description = "Контроллер для работы с оценками")
public class GatewayRatingController {

    private final RatingServiceClient ratingServiceClient;

    @GetMapping("/{routeId}")
    @Operation(summary = "Получить рейтинг маршрута по id")
    public ResponseEntity<AverageRatingDto> getRating(
            @PathVariable("routeId") @Parameter(description = "Id маршрута", required = true) Long routeId) {
        return ResponseEntity.ok(
                ratingServiceClient.getRating(routeId)
        );
    }

    @PutMapping
    @Operation(summary = "Получить рейтинги для списка маршрутов")
    public ResponseEntity<Map<Long, Float>> getRatings(
            @RequestBody @Parameter(description = "Список c id маршрутов", required = true) List<Long> routeIds) {
        return ResponseEntity.ok(
                ratingServiceClient.getRatings(routeIds)
        );
    }

    @PostMapping
    @Operation(summary = "Оставить оценку")
    public ResponseEntity<RatingDto> create(
            @RequestParam @Parameter(description = "Id пользователя", required = true) Long userId,
            @RequestBody @Parameter(description = "Оценка", required = true) RatingDto ratingDto) {
        return ResponseEntity.ok(
                ratingServiceClient.create(userId, ratingDto)
        );
    }

    @PatchMapping
    @Operation(summary = "Инвалидация и пересчет рейтинга")
    public ResponseEntity<Void> update() {
        ratingServiceClient.update();
        return ResponseEntity.ok()
                .build();
    }
}
