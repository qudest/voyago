package by.smertex.core.service.impl;

import by.smertex.core.database.model.AverageRating;
import by.smertex.core.database.model.Rating;
import by.smertex.core.database.repository.AverageRatingRepository;
import by.smertex.core.database.repository.RatingRepository;
import by.smertex.core.dto.AverageRatingDto;
import by.smertex.core.dto.RatingDto;
import by.smertex.core.exception.impl.CrudException;
import by.smertex.core.mapper.Mapper;
import by.smertex.core.service.RatingService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Getter
@RequiredArgsConstructor
@Slf4j
public class RatingServiceImpl implements RatingService {

    private final RatingRepository ratingRepository;
    private final AverageRatingRepository averageRatingRepository;
    private final Mapper<Rating, RatingDto> ratingToDtoMapper;
    private final Mapper<AverageRating, AverageRatingDto> averageRatingToDtoMapper;

    @Override
    public AverageRatingDto getAverageRating(Long routeId) {
        AverageRating averageRating = averageRatingRepository.findById(routeId)
                .orElse(new AverageRating(routeId, 0.0f));
        return averageRatingToDtoMapper.map(averageRating);
    }

    @Override
    @Transactional
    public RatingDto create(Long userId, RatingDto ratingDto) {
        boolean hasRated = ratingRepository.findAllByUserId(userId).stream()
                .anyMatch(rating -> rating.getRouteId().equals(ratingDto.routeId()));
        if (hasRated) {
            throw new CrudException("User already rated this route", HttpStatus.BAD_REQUEST);
        }
        return Optional.of(ratingRepository.save(Rating.builder()
                        .routeId(ratingDto.routeId())
                        .rating(ratingDto.rating())
                        .userId(userId)
                        .build()))
                .map(ratingToDtoMapper::map)
                .orElseThrow(() -> new CrudException("Failed to add rating", HttpStatus.INTERNAL_SERVER_ERROR));
    }

    @Scheduled(cron = "@daily")
    protected void dailyAverageRatingUpdate() {
        updateAverageRating();
    }

    @Override
    public void updateAverageRating() {
        Map<Long, List<Rating>> collect = ratingRepository.findAll().stream()
                .collect(Collectors.groupingBy(Rating::getRouteId));
        for (Map.Entry<Long, List<Rating>> entry : collect.entrySet()) {
            Long routeId = entry.getKey();
            List<Rating> ratings = entry.getValue();
            double average = ratings.stream()
                    .mapToDouble(Rating::getRating)
                    .average()
                    .orElse(0.0);
            AverageRating averageRating = new AverageRating(routeId, (float) average);
            averageRatingRepository.save(averageRating);
        }
    }

    @Override
    public Map<Long, Float> getAverageRatings(List<Long> routeIds) {
        Map<Long, Float> averageRatings = new HashMap<>();
        for (Long routeId : routeIds) {
            averageRatings.put(routeId, getAverageRating(routeId).averageRating());
        }
        return averageRatings;
    }
}
