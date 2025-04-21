package by.smertex.core.service;

import by.smertex.core.dto.AverageRatingDto;
import by.smertex.core.dto.RatingDto;

public interface RatingService {

    AverageRatingDto getAverageRating(Long routeId);

    RatingDto create(Long userId, RatingDto ratingDto);

    void updateAverageRating();
}
