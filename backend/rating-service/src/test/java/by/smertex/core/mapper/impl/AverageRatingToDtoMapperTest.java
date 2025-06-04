package by.smertex.core.mapper.impl;

import by.smertex.core.database.model.AverageRating;
import by.smertex.core.dto.AverageRatingDto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class AverageRatingToDtoMapperTest {

    @Test
    void map_ReturnsDto_WhenInputIsValid() {
        AverageRatingToDtoMapper mapper = new AverageRatingToDtoMapper();
        AverageRating input = new AverageRating(1L, 4.5f);

        AverageRatingDto result = mapper.map(input);

        Assertions.assertNotNull(result);
        Assertions.assertEquals(1L, result.routeId());
        Assertions.assertEquals(4.5f, result.averageRating());
    }

    @Test
    void map_ReturnsDtoWithNullRating_WhenRatingIsNull() {
        AverageRatingToDtoMapper mapper = new AverageRatingToDtoMapper();
        AverageRating input = new AverageRating(2L, null);

        AverageRatingDto result = mapper.map(input);

        Assertions.assertNotNull(result);
        Assertions.assertEquals(2L, result.routeId());
        Assertions.assertNull(result.averageRating());
    }
}