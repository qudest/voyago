package by.smertex.core.client;

import by.smertex.core.dto.service.rating.AverageRatingDto;
import by.smertex.core.dto.service.rating.RatingDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@FeignClient(value = "rating-service")
public interface RatingServiceClient {
    @GetMapping("/api/ratings/{routeId}")
    AverageRatingDto getRating(@PathVariable("routeId") Long routeId);

    @PutMapping("/api/ratings")
    Map<Long, Float> getRatings(@RequestBody List<Long> routeIds);

    @PostMapping("/api/ratings")
    RatingDto create(@RequestParam Long userId, @RequestBody RatingDto ratingDto);

    @PatchMapping("/api/ratings")
    void update();
}
