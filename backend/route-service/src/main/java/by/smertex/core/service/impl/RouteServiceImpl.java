package by.smertex.core.service.impl;

import by.smertex.core.client.RatingServiceClient;
import by.smertex.core.database.model.Route;
import by.smertex.core.database.model.UserRouteInfo;
import by.smertex.core.database.repository.RouteRepository;
import by.smertex.core.dto.external.AverageRatingDto;
import by.smertex.core.dto.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.output.RouteReadDto;
import by.smertex.core.exception.impl.CrudException;
import by.smertex.core.mapper.Mapper;
import by.smertex.core.service.RouteService;
import by.smertex.core.service.UserRouteInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RouteServiceImpl implements RouteService {

    private final RouteRepository routeRepository;
    private final Mapper<RouteCreateOrUpdateDto, Route> dtoRouteMapper;
    private final Mapper<Route, RouteReadDto> routeDtoMapper;
    private final RatingServiceClient ratingServiceClient;
    private final UserRouteInfoService userRouteInfoService;

    @Override
    public RouteReadDto findById(Long id) {
        RouteReadDto routeReadDto = routeRepository.findById(id)
                .map(routeDtoMapper::map)
                .orElseThrow(() -> new CrudException("Route not found", HttpStatus.NOT_FOUND));
        AverageRatingDto rating = ratingServiceClient.getRating(id);
        routeReadDto.setRating(rating.averageRating());
        return routeReadDto;
    }

    @Override
    public List<RouteReadDto> findAll() {
        List<RouteReadDto> list = routeRepository.findAll().stream().map(routeDtoMapper::map).toList();
        Map<Long, Float> averageRatings = ratingServiceClient.getRating(list.stream().map(RouteReadDto::getId).toList());
        list.forEach(routeReadDto -> {
            Float rating = averageRatings.get(routeReadDto.getId());
            routeReadDto.setRating(rating);
        });
        return list;
    }

    @Override
    public List<RouteReadDto> findAllFavorites(Long userId) {
        return Optional.ofNullable(userRouteInfoService.findAllByUserId(userId))
                .orElse(List.of())
                .stream()
                .filter(userRouteInfo -> userRouteInfo != null && userRouteInfo.getIsFavorite())
                .map(UserRouteInfo::getRouteId)
                .map(routeId -> routeRepository.findById(routeId).orElse(null))
                .filter(Objects::nonNull)
                .map(routeDtoMapper::map)
                .peek(routeReadDto -> {
                    if (routeReadDto != null) {
                        AverageRatingDto rating = ratingServiceClient.getRating(routeReadDto.getId());
                        if (rating != null) {
                            routeReadDto.setRating(rating.averageRating());
                        }
                    }
                })
                .toList();
    }

    @Override
    public List<RouteReadDto> findAllPassed(Long userId) {
        return Optional.ofNullable(userRouteInfoService.findAllByUserId(userId))
                .orElse(List.of())
                .stream()
                .filter(userRouteInfo -> userRouteInfo != null && userRouteInfo.getIsPassed())
                .map(UserRouteInfo::getRouteId)
                .map(routeId -> routeRepository.findById(routeId).orElse(null))
                .filter(Objects::nonNull)
                .map(routeDtoMapper::map)
                .peek(routeReadDto -> {
                    if (routeReadDto != null) {
                        AverageRatingDto rating = ratingServiceClient.getRating(routeReadDto.getId());
                        if (rating != null) {
                            routeReadDto.setRating(rating.averageRating());
                        }
                    }
                })
                .toList();
    }

    @Override
    @Transactional
    public RouteReadDto create(RouteCreateOrUpdateDto dto) {
        if (!routeRepository.findByName(dto.name()).isEmpty()) {
            throw new CrudException("Route with this name exists", HttpStatus.BAD_REQUEST);
        }
        return Optional.of(routeRepository.save(dtoRouteMapper.map(dto)))
                .map(routeDtoMapper::map)
                .orElseThrow(() -> new CrudException("Unable to create route", HttpStatus.INTERNAL_SERVER_ERROR));
    }

    @Override
    @Transactional
    public void update(Long id, RouteCreateOrUpdateDto dto) {
        routeRepository.saveAndFlush(
                routeRepository.findById(id)
                        .map(route -> dtoRouteMapper.map(dto, route))
                        .orElseThrow(() -> new CrudException("Route not found", HttpStatus.NOT_FOUND))
        );
    }

    @Override
    @Transactional
    public void addToFavorites(Long routeId, Long userId) {
    }

    @Override
    @Transactional
    public void delete(Long id) {
        routeRepository.findById(id)
                .map(route -> {
                    routeRepository.delete(route);
                    return route;
                })
                .orElseThrow(() -> new CrudException("Route not found", HttpStatus.NOT_FOUND));
    }
}
