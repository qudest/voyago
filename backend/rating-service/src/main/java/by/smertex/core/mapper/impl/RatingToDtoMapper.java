package by.smertex.core.mapper.impl;

import by.smertex.core.database.model.Rating;
import by.smertex.core.dto.RatingDto;
import by.smertex.core.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class RatingToDtoMapper implements Mapper<Rating, RatingDto> {

    @Override
    public RatingDto map(Rating from) {
        return new RatingDto(
                from.getRouteId(),
                from.getRating()
        );
    }
}
