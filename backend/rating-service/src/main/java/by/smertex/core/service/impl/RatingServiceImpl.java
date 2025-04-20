package by.smertex.core.service.impl;

import by.smertex.core.database.model.AverageRating;
import by.smertex.core.database.model.Rating;
import by.smertex.core.database.repository.AverageRatingRepository;
import by.smertex.core.database.repository.RatingRepository;
import by.smertex.core.dto.AverageRatingDto;
import by.smertex.core.dto.RatingDto;
import by.smertex.core.mapper.Mapper;
import by.smertex.core.service.RatingService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

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
        AverageRating averageRating = averageRatingRepository.findById(routeId.toString()).orElseThrow(RuntimeException::new);
        return averageRatingToDtoMapper.map(averageRating);
    }

    @Override
    public RatingDto create(Long userId, RatingDto ratingDto) {
        return Optional.of(ratingRepository.save(Rating.builder()
                        .routeId(ratingDto.routeId())
                        .rating(ratingDto.rating())
                        .userId(userId)
                        .build()))
                .map(ratingToDtoMapper::map)
                .orElseThrow();
    }

    @Scheduled(fixedRate = 5000)
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
        log.info("Update average rating");
    }
}
