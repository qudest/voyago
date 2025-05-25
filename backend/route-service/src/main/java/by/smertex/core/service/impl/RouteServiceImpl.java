package by.smertex.core.service.impl;

import by.smertex.core.client.RatingServiceClient;
import by.smertex.core.database.model.Route;
import by.smertex.core.database.model.UserRouteInfo;
import by.smertex.core.database.repository.RouteRepository;
import by.smertex.core.dto.external.AverageRatingDto;
import by.smertex.core.dto.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.input.RouteFilterDto;
import by.smertex.core.dto.output.PageResponse;
import by.smertex.core.dto.output.RouteReadDto;
import by.smertex.core.exception.impl.CrudException;
import by.smertex.core.mapper.Mapper;
import by.smertex.core.service.RouteService;
import by.smertex.core.service.UserRouteInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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
    public PageResponse<RouteReadDto> findAllByFilter(RouteFilterDto routeFilter, Pageable pageable) {
        Slice<RouteReadDto> slice = routeRepository.findAllByFilter(routeFilter, pageable)
                .map(routeDtoMapper::map);
        return PageResponse.toPage(slice);
    }

    @Override
    public PageResponse<RouteReadDto> findAllFavoritesByFilter(Long userId, RouteFilterDto routeFilter, Pageable pageable) {
        Slice<RouteReadDto> slice = routeRepository.findAllByFilter(routeFilter, pageable)
                .map(routeDtoMapper::map);
        List<Long> allByUserId = userRouteInfoService.findAllByUserId(userId)
                .stream()
                .filter(Objects::nonNull)
                .filter(userRouteInfo -> Boolean.TRUE.equals(userRouteInfo.getIsFavorite()))
                .map(UserRouteInfo::getRouteId)
                .toList();
        return getRouteReadDtoPageResponse(slice, allByUserId);
    }

    @Override
    public PageResponse<RouteReadDto> findAllPassedByFilter(Long userId, RouteFilterDto routeFilter, Pageable pageable) {
        Slice<RouteReadDto> slice = routeRepository.findAllByFilter(routeFilter, pageable)
                .map(routeDtoMapper::map);
        List<Long> allByUserId = userRouteInfoService.findAllByUserId(userId)
                .stream()
                .filter(Objects::nonNull)
                .filter(userRouteInfo -> Boolean.TRUE.equals(userRouteInfo.getIsPassed()))
                .map(UserRouteInfo::getRouteId)
                .toList();
        return getRouteReadDtoPageResponse(slice, allByUserId);
    }

    private PageResponse<RouteReadDto> getRouteReadDtoPageResponse(Slice<RouteReadDto> slice, List<Long> allByUserId) {
        int size = slice.getSize();
        int page = slice.getNumber();
        List<RouteReadDto> list = slice.stream()
                .filter(Objects::nonNull)
                .filter(route -> allByUserId.contains(route.getId()))
                .toList();
        return PageResponse.toPage(list, size, page);
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
    public void delete(Long id) {
        routeRepository.findById(id)
                .map(route -> {
                    routeRepository.delete(route);
                    return route;
                })
                .orElseThrow(() -> new CrudException("Route not found", HttpStatus.NOT_FOUND));
    }
}
