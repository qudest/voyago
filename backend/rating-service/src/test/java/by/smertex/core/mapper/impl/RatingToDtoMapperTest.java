package by.smertex.core.mapper.impl;

import by.smertex.core.database.model.Rating;
import by.smertex.core.dto.RatingDto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;



public class RatingToDtoMapperTest {

    @Test
    void map_ReturnsDto_WhenInputIsValid() {
        RatingToDtoMapper mapper = new RatingToDtoMapper();
        Rating input = new Rating(10L, 3L, 5, 20L);

        RatingDto result = mapper.map(input);

        Assertions.assertNotNull(result);
        Assertions.assertEquals(3L, result.routeId());
        Assertions.assertEquals(5, result.rating());
    }

    @Test
    void map_ReturnsDtoWithZero_WhenRatingIsNull() {
        RatingToDtoMapper mapper = new RatingToDtoMapper();
        Rating input = new Rating(11L, 4L, null, 21L);

        RatingDto result = mapper.map(input);

        Assertions.assertNotNull(result);
        Assertions.assertEquals(4L, result.routeId());
        Assertions.assertNull(result.rating());
    }
}