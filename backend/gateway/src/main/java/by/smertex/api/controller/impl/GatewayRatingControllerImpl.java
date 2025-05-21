package by.smertex.api.controller.impl;

import by.smertex.api.controller.GatewayRatingController;
import by.smertex.core.client.RatingServiceClient;
import by.smertex.core.dto.service.rating.AverageRatingDto;
import by.smertex.core.dto.service.rating.RatingDto;
import by.smertex.core.dto.service.rating.RatingUserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ratings")
@RequiredArgsConstructor
public class GatewayRatingControllerImpl implements GatewayRatingController {

    private final RatingServiceClient ratingServiceClient;

    @GetMapping("/{routeId}")
    public ResponseEntity<AverageRatingDto> getRating(@PathVariable("routeId") Long routeId) {
        return ResponseEntity.ok(
                ratingServiceClient.getRating(routeId)
        );
    }

    @PutMapping
    public ResponseEntity<Map<Long, Float>> getRatings(@RequestBody List<Long> routeIds) {
        return ResponseEntity.ok(
                ratingServiceClient.getRatings(routeIds)
        );
    }

    @GetMapping
    public ResponseEntity<RatingDto> getRatingByUserId(@RequestParam Long routeId, @RequestParam Long userId) {
        RatingUserDto ratingUserDto = new RatingUserDto(routeId, userId);
        return ResponseEntity.ok(
                ratingServiceClient.getRatingByUserId(ratingUserDto)
        );
    }

    @PostMapping
    public ResponseEntity<RatingDto> create(@RequestParam Long userId,
                                            @RequestBody RatingDto ratingDto) {
        return ResponseEntity.ok(
                ratingServiceClient.create(userId, ratingDto)
        );
    }

    @PatchMapping
    public ResponseEntity<Void> update() {
        ratingServiceClient.update();
        return ResponseEntity.ok()
                .build();
    }
}
