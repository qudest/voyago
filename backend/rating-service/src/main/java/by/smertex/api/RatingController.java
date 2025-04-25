package by.smertex.api;

import by.smertex.core.dto.AverageRatingDto;
import by.smertex.core.dto.RatingDto;

public interface RatingController {

    AverageRatingDto getRating(Long routeId);

    RatingDto create(Long userId, RatingDto ratingDto);
}
