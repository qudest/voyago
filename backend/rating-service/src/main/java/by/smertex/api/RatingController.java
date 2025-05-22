package by.smertex.api;

import by.smertex.core.dto.AverageRatingDto;
import by.smertex.core.dto.RatingDto;
import by.smertex.core.dto.RatingUserDto;

import java.util.List;
import java.util.Map;

public interface RatingController {

    AverageRatingDto getRating(Long routeId);

    RatingDto create(Long userId, RatingDto ratingDto);

    Map<Long, Float> getRatings(List<Long> routeIds);

    RatingDto getRatingByUserId(RatingUserDto ratingUserDto);
}
