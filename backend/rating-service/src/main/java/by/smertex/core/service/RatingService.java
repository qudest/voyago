package by.smertex.core.service;

import by.smertex.core.dto.AverageRatingDto;
import by.smertex.core.dto.RatingDto;
import by.smertex.core.dto.RatingUserDto;

import java.util.List;
import java.util.Map;

public interface RatingService {

    AverageRatingDto getAverageRating(Long routeId);

    RatingDto create(Long userId, RatingDto ratingDto);

    void updateAverageRating();

    Map<Long, Float> getAverageRatings(List<Long> routeIds);

    RatingDto getRatingByUserId(RatingUserDto ratingUserDto);
}
