package by.smertex.core.client;

import by.smertex.core.dto.external.AverageRatingDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

@FeignClient(value = "rating-service")
public interface RatingServiceClient {

    @GetMapping("/api/ratings/{routeId}")
    AverageRatingDto getRating(@PathVariable("routeId") Long routeId);

    @PutMapping("/api/ratings")
    Map<Long, Float> getRating(@RequestBody List<Long> routeIds);
}
