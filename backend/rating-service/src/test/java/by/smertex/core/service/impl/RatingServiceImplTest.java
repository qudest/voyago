package by.smertex.core.service.impl;

import by.smertex.core.database.model.AverageRating;
import by.smertex.core.database.model.Rating;
import by.smertex.core.database.repository.AverageRatingRepository;
import by.smertex.core.database.repository.RatingRepository;
import by.smertex.core.dto.AverageRatingDto;
import by.smertex.core.dto.RatingDto;
import by.smertex.core.dto.RatingUserDto;
import by.smertex.core.exception.impl.CrudException;
import by.smertex.core.mapper.impl.AverageRatingToDtoMapper;
import by.smertex.core.mapper.impl.RatingToDtoMapper;
import by.smertex.core.service.RatingService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.util.List;
import java.util.Map;
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

    @Test
    void getRatingByUserId() {
        Rating rating = new Rating(2L, 2L, 3, 2L);
        Mockito.when(ratingRepository.findByRouteIdAndUserId(2L, 2L))
                .thenReturn(Optional.of(rating));

        RatingDto foundDto = ratingService.getRatingByUserId(new RatingUserDto(2L, 2L));

        Assertions.assertNotNull(foundDto);
        Assertions.assertEquals(2L, foundDto.routeId());
        Assertions.assertEquals(3, foundDto.rating());
    }

    @Test
    void getAverageRatings() {
        Mockito.when(averageRatingRepository.findById(1L))
                .thenReturn(Optional.of(new AverageRating(1L, 4.0f)));
        Mockito.when(averageRatingRepository.findById(2L))
                .thenReturn(Optional.of(new AverageRating(2L, 3.5f)));

        Map<Long, Float> result = ratingService.getAverageRatings(List.of(1L, 2L));

        Assertions.assertEquals(4.0f, result.get(1L));
        Assertions.assertEquals(3.5f, result.get(2L));
    }

    @Test
    void updateAverageRating() {
        List<Rating> ratings = List.of(
                new Rating(10L, 5L, 5, 3L),
                new Rating(11L, 5L, 3, 4L)
        );
        Mockito.when(ratingRepository.findAll()).thenReturn(ratings);

        ratingService.updateAverageRating();

        Mockito.verify(averageRatingRepository, Mockito.times(1))
                .save(Mockito.any(AverageRating.class));
    }

    @Test
    void createRatingAlreadyExists() {
        Long userId = 2L;
        RatingDto ratingDto = new RatingDto(1L, 4);
        Mockito.when(ratingRepository.findAllByUserId(userId))
                .thenReturn(List.of(new Rating(5L, 1L, 4, userId)));

        Assertions.assertThrows(CrudException.class, () -> ratingService.create(userId, ratingDto));
    }

    @Test
    void getRatingNotFound() {
        Mockito.when(ratingRepository.findByRouteIdAndUserId(99L, 99L))
                .thenReturn(Optional.empty());

        Assertions.assertThrows(CrudException.class, () ->
                ratingService.getRatingByUserId(new RatingUserDto(99L, 99L)));
    }
}