package by.smertex.api.impl;

import by.smertex.api.RatingController;
import by.smertex.core.dto.AverageRatingDto;
import by.smertex.core.dto.RatingDto;
import by.smertex.core.service.RatingService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ratings")
@RequiredArgsConstructor
public class RatingControllerImpl implements RatingController {

    private final RatingService ratingService;

    @GetMapping("/{routeId}")
    public AverageRatingDto getRating(@PathVariable("routeId") Long routeId) {
        return ratingService.getAverageRating(routeId);
    }

    @PutMapping
    public Map<Long, Float> getRatings(@RequestBody List<Long> routeIds) {
        return ratingService.getAverageRatings(routeIds);
    }

    @PostMapping
    public RatingDto create(@RequestParam Long userId, @Valid @RequestBody RatingDto ratingDto) {
        return ratingService.create(userId, ratingDto);
    }

    @PatchMapping
    @Operation(summary = "Invalidate all ratings and recalculate the average rating")
    public void update() {
        ratingService.updateAverageRating();
    }
}
