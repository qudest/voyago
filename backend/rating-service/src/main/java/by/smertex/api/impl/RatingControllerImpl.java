package by.smertex.api.impl;

import by.smertex.api.RatingController;
import by.smertex.core.dto.AverageRatingDto;
import by.smertex.core.dto.RatingDto;
import by.smertex.core.service.RatingService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ratings")
@RequiredArgsConstructor
public class RatingControllerImpl implements RatingController {

    private final RatingService ratingService;

    @GetMapping
    public AverageRatingDto getRating(@RequestParam Long routeId) {
        return ratingService.getAverageRating(routeId);
    }

    @PostMapping
    public RatingDto create(@RequestParam Long userId, @Valid @RequestBody RatingDto ratingDto) {
        return ratingService.create(userId, ratingDto);
    }

    @PutMapping
    @Operation(summary = "Invalidate all ratings and recalculate the average rating")
    public void update() {
        ratingService.updateAverageRating();
    }
}
