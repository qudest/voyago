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
import by.smertex.core.service.UserRouteInfoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.http.HttpStatus;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class RouteServiceImplTest {

    private RouteRepository routeRepository;
    private Mapper<RouteCreateOrUpdateDto, Route> dtoRouteMapper;
    private Mapper<Route, RouteReadDto> routeDtoMapper;
    private RatingServiceClient ratingServiceClient;
    private UserRouteInfoService userRouteInfoService;
    private RouteServiceImpl routeService;

    @BeforeEach
    void setUp() {
        routeRepository = mock(RouteRepository.class);
        dtoRouteMapper = mock(Mapper.class);
        routeDtoMapper = mock(Mapper.class);
        ratingServiceClient = mock(RatingServiceClient.class);
        userRouteInfoService = mock(UserRouteInfoService.class);
        routeService = new RouteServiceImpl(
                routeRepository, dtoRouteMapper, routeDtoMapper, ratingServiceClient, userRouteInfoService
        );
    }

    @Test
    void findById_ReturnsRouteReadDtoWithRating_WhenRouteExists() {
        Route route = new Route();
        RouteReadDto routeReadDto = new RouteReadDto();
        AverageRatingDto ratingDto = new AverageRatingDto(1L, 4.5f);

        when(routeRepository.findById(1L)).thenReturn(Optional.of(route));
        when(routeDtoMapper.map(route)).thenReturn(routeReadDto);
        when(ratingServiceClient.getRating(1L)).thenReturn(ratingDto);

        RouteReadDto result = routeService.findById(1L);

        assertThat(result).isEqualTo(routeReadDto);
        assertThat(result.getRating()).isEqualTo(4.5f);
    }

    @Test
    void findById_ThrowsCrudException_WhenRouteNotFound() {
        when(routeRepository.findById(1L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> routeService.findById(1L))
                .isInstanceOf(CrudException.class)
                .hasMessageContaining("Route not found")
                .extracting("status")
                .isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    void findAllByFilter_ReturnsPageResponseWithMappedRoutes() {
        RouteFilterDto filter = new RouteFilterDto(null, null, null, null, null, null, null, null, null, null);
        Pageable pageable = PageRequest.of(0, 10);
        Route route = new Route();
        RouteReadDto routeReadDto = new RouteReadDto();
        Slice<Route> routeSlice = new SliceImpl<>(List.of(route), pageable, false);

        when(routeRepository.findAllByFilter(filter, pageable)).thenReturn(routeSlice);
        when(routeDtoMapper.map(route)).thenReturn(routeReadDto);

        PageResponse<RouteReadDto> response = routeService.findAllByFilter(filter, pageable);

        assertThat(response.getData()).containsExactly(routeReadDto);
    }

    @Test
    void findAllByFilter_ReturnsEmptyPageResponse_WhenNoRoutesFound() {
        RouteFilterDto filter = new RouteFilterDto(null, null, null, null, null, null, null, null, null, null);
        Pageable pageable = PageRequest.of(0, 10);
        Slice<Route> emptySlice = new SliceImpl<>(List.of(), pageable, false);

        when(routeRepository.findAllByFilter(filter, pageable)).thenReturn(emptySlice);

        PageResponse<RouteReadDto> response = routeService.findAllByFilter(filter, pageable);

        assertThat(response.getData()).isEmpty();
    }

    @Test
    void findAllFavoritesByFilter_ReturnsOnlyFavoriteRoutes() {
        Long userId = 1L;
        RouteFilterDto filter = new RouteFilterDto(null, null, null, null, null, null, null, null, null, null);
        Pageable pageable = PageRequest.of(0, 10);
        RouteReadDto favoriteRoute = new RouteReadDto();
        favoriteRoute.setId(100L);
        RouteReadDto nonFavoriteRoute = new RouteReadDto();
        nonFavoriteRoute.setId(200L);

        Slice<Route> routeSlice = new SliceImpl<>(List.of(new Route(), new Route()), pageable, false);
        when(routeRepository.findAllByFilter(filter, pageable)).thenReturn(routeSlice);
        when(routeDtoMapper.map(any())).thenReturn(favoriteRoute, nonFavoriteRoute);
        UserRouteInfo favoriteInfo = new UserRouteInfo();
        favoriteInfo.setRouteId(100L);
        favoriteInfo.setIsFavorite(true);
        when(userRouteInfoService.findAllByUserId(userId)).thenReturn(List.of(favoriteInfo));

        PageResponse<RouteReadDto> response = routeService.findAllFavoritesByFilter(userId, filter, pageable);

        assertThat(response.getData()).extracting(RouteReadDto::getId).containsExactly(100L);
    }

    @Test
    void findAllFavoritesByFilter_ReturnsEmpty_WhenUserHasNoFavorites() {
        Long userId = 3L;
        RouteFilterDto filter = new RouteFilterDto(null, null, null, null, null, null, null, null, null, null);
        Pageable pageable = PageRequest.of(0, 10);
        RouteReadDto route1 = new RouteReadDto();
        route1.setId(500L);

        Slice<Route> routeSlice = new SliceImpl<>(List.of(new Route()), pageable, false);
        when(routeRepository.findAllByFilter(filter, pageable)).thenReturn(routeSlice);
        when(routeDtoMapper.map(any())).thenReturn(route1);
        when(userRouteInfoService.findAllByUserId(userId)).thenReturn(List.of());

        PageResponse<RouteReadDto> response = routeService.findAllFavoritesByFilter(userId, filter, pageable);

        assertThat(response.getData()).isEmpty();
    }

    @Test
    void findAllPassedByFilter_ReturnsOnlyPassedRoutes() {
        Long userId = 2L;
        RouteFilterDto filter = new RouteFilterDto(null, null, null, null, null, null, null, null, null, null);
        Pageable pageable = PageRequest.of(0, 10);
        RouteReadDto passedRoute = new RouteReadDto();
        passedRoute.setId(300L);
        RouteReadDto nonPassedRoute = new RouteReadDto();
        nonPassedRoute.setId(400L);

        Slice<Route> routeSlice = new SliceImpl<>(List.of(new Route(), new Route()), pageable, false);
        when(routeRepository.findAllByFilter(filter, pageable)).thenReturn(routeSlice);
        when(routeDtoMapper.map(any())).thenReturn(passedRoute, nonPassedRoute);
        UserRouteInfo passedInfo = new UserRouteInfo();
        passedInfo.setRouteId(300L);
        passedInfo.setIsPassed(true);
        when(userRouteInfoService.findAllByUserId(userId)).thenReturn(List.of(passedInfo));

        PageResponse<RouteReadDto> response = routeService.findAllPassedByFilter(userId, filter, pageable);

        assertThat(response.getData()).extracting(RouteReadDto::getId).containsExactly(300L);
    }

    @Test
    void findAllPassedByFilter_ReturnsEmpty_WhenUserHasNoPassedRoutes() {
        Long userId = 4L;
        RouteFilterDto filter = new RouteFilterDto(null, null, null, null, null, null, null, null, null, null);
        Pageable pageable = PageRequest.of(0, 10);
        RouteReadDto route1 = new RouteReadDto();
        route1.setId(600L);

        Slice<Route> routeSlice = new SliceImpl<>(List.of(new Route()), pageable, false);
        when(routeRepository.findAllByFilter(filter, pageable)).thenReturn(routeSlice);
        when(routeDtoMapper.map(any())).thenReturn(route1);
        when(userRouteInfoService.findAllByUserId(userId)).thenReturn(List.of());

        PageResponse<RouteReadDto> response = routeService.findAllPassedByFilter(userId, filter, pageable);

        assertThat(response.getData()).isEmpty();
    }

    @Test
    void create_SavesAndReturnsMappedRoute_WhenNameIsUnique() {
        RouteCreateOrUpdateDto dto = mock(RouteCreateOrUpdateDto.class);
        Route route = new Route();
        RouteReadDto routeReadDto = new RouteReadDto();

        when(routeRepository.findByName(any())).thenReturn(Collections.emptyList());
        when(dtoRouteMapper.map(dto)).thenReturn(route);
        when(routeRepository.save(route)).thenReturn(route);
        when(routeDtoMapper.map(route)).thenReturn(routeReadDto);

        RouteReadDto result = routeService.create(dto);

        assertThat(result).isEqualTo(routeReadDto);
    }

    @Test
    void create_ThrowsCrudException_WhenNameExists() {
        RouteCreateOrUpdateDto dto = mock(RouteCreateOrUpdateDto.class);

        when(routeRepository.findByName(any())).thenReturn(List.of(new Route()));

        assertThatThrownBy(() -> routeService.create(dto))
                .isInstanceOf(CrudException.class)
                .hasMessageContaining("Route with this name exists")
                .extracting("status")
                .isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    void update_UpdatesRoute_WhenRouteExists() {
        Long id = 1L;
        RouteCreateOrUpdateDto dto = mock(RouteCreateOrUpdateDto.class);
        Route existingRoute = new Route();
        Route updatedRoute = new Route();

        when(routeRepository.findById(id)).thenReturn(Optional.of(existingRoute));
        when(dtoRouteMapper.map(dto, existingRoute)).thenReturn(updatedRoute);

        routeService.update(id, dto);

        verify(routeRepository).saveAndFlush(updatedRoute);
    }

    @Test
    void update_ThrowsCrudException_WhenRouteNotFound() {
        Long id = 1L;
        RouteCreateOrUpdateDto dto = mock(RouteCreateOrUpdateDto.class);

        when(routeRepository.findById(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> routeService.update(id, dto))
                .isInstanceOf(CrudException.class)
                .hasMessageContaining("Route not found")
                .extracting("status")
                .isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    void delete_DeletesRoute_WhenRouteExists() {
        Long id = 1L;
        Route route = new Route();

        when(routeRepository.findById(id)).thenReturn(Optional.of(route));

        routeService.delete(id);

        verify(routeRepository).delete(route);
    }

    @Test
    void delete_ThrowsCrudException_WhenRouteNotFound() {
        Long id = 1L;

        when(routeRepository.findById(id)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> routeService.delete(id))
                .isInstanceOf(CrudException.class)
                .hasMessageContaining("Route not found")
                .extracting("status")
                .isEqualTo(HttpStatus.NOT_FOUND);
    }
}