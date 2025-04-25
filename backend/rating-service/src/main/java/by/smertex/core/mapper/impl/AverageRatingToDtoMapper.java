package by.smertex.core.mapper.impl;

import by.smertex.core.database.model.AverageRating;
import by.smertex.core.dto.AverageRatingDto;
import by.smertex.core.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class AverageRatingToDtoMapper implements Mapper<AverageRating, AverageRatingDto> {

    @Override
    public AverageRatingDto map(AverageRating from) {
        return new AverageRatingDto(from.getId(), from.getAverageRating());
    }
}
