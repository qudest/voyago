package by.smertex.core.service.impl;

import by.smertex.core.database.model.AverageRating;
import by.smertex.core.database.model.Rating;
import by.smertex.core.database.repository.AverageRatingRepository;
import by.smertex.core.database.repository.RatingRepository;
import by.smertex.core.dto.AverageRatingDto;
import by.smertex.core.dto.RatingDto;
import by.smertex.core.mapper.impl.AverageRatingToDtoMapper;
import by.smertex.core.mapper.impl.RatingToDtoMapper;
import by.smertex.core.service.RatingService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.util.Optional;

@SpringBootTest(
        classes = {
                RatingServiceImpl.class,
                AverageRatingToDtoMapper.class,
                RatingToDtoMapper.class
        },
        webEnvironment = SpringBootTest.WebEnvironment.NONE
)
class RatingServiceImplTest {

    @Autowired
    private RatingService ratingService;

    @MockitoBean
    private RatingRepository ratingRepository;

    @MockitoBean
    private AverageRatingRepository averageRatingRepository;

    @Test
    void getAverageRating() {
        Long routeId = 1L;
        AverageRating averageRating = new AverageRating(routeId, 4.5f);
        AverageRatingDto expectedDto = new AverageRatingDto(routeId, 4.5f);
        Mockito.when(averageRatingRepository.findById(routeId)).thenReturn(Optional.of(averageRating));

        AverageRatingDto actualDto = ratingService.getAverageRating(routeId);

        Assertions.assertNotNull(actualDto);
        Assertions.assertEquals(expectedDto, actualDto);
    }

    @Test
    void addRating() {
        Long routeId = 1L;
        Integer rating = 5;
        RatingDto ratingDto = new RatingDto(routeId, rating);
        Mockito.when(ratingRepository.save(Mockito.any())).thenReturn(new Rating(1L, routeId, rating, 1L));

        RatingDto actualDto = ratingService.create(1L, ratingDto);

        Assertions.assertNotNull(actualDto);
        Assertions.assertEquals(routeId, actualDto.routeId());
        Assertions.assertEquals(rating, actualDto.rating());
    }
}