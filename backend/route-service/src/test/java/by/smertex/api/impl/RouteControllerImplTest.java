package by.smertex.api.impl;

import by.smertex.core.database.model.Tag;
import by.smertex.core.dto.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.input.RouteFilterDto;
import by.smertex.core.dto.input.RouteUserDto;
import by.smertex.core.dto.output.PageResponse;
import by.smertex.core.dto.output.RouteReadDto;
import by.smertex.core.service.RouteService;
import by.smertex.core.service.UserRouteInfoService;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Pageable;

import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RouteControllerImplTest {

    @Mock
    private RouteService routeService;
    @Mock
    private UserRouteInfoService userRouteInfoService;

    @InjectMocks
    private RouteControllerImpl controller;

    @org.junit.jupiter.api.Test
    void findById_ReturnsRouteReadDto_WhenIdExists() {
        RouteReadDto expected = mock(RouteReadDto.class);
        when(routeService.findById(1L)).thenReturn(expected);

        RouteReadDto result = controller.findById(1L);

        assertThat(result).isEqualTo(expected);
        verify(routeService).findById(1L);
    }

    @org.junit.jupiter.api.Test
    void findAllByFilter_ReturnsPageResponse_WithEmptyFilters() {
        PageResponse<RouteReadDto> expected = mock(PageResponse.class);
        Pageable pageable = mock(Pageable.class);
        when(routeService.findAllByFilter(any(RouteFilterDto.class), eq(pageable))).thenReturn(expected);

        PageResponse<RouteReadDto> result = controller.findAllByFilter(
                null, null, null, null, null, null, null, null, null, null, pageable);

        assertThat(result).isEqualTo(expected);
        ArgumentCaptor<RouteFilterDto> captor = ArgumentCaptor.forClass(RouteFilterDto.class);
        verify(routeService).findAllByFilter(captor.capture(), eq(pageable));
        RouteFilterDto filter = captor.getValue();
        assertThat(filter.name()).isNull();
        assertThat(filter.tags()).isNull();
    }

    @org.junit.jupiter.api.Test
    void findAllFavoritesByFilter_ReturnsPageResponse_WithUserId() {
        PageResponse<RouteReadDto> expected = mock(PageResponse.class);
        Pageable pageable = mock(Pageable.class);
        when(routeService.findAllFavoritesByFilter(eq(42L), any(RouteFilterDto.class), eq(pageable))).thenReturn(expected);

        PageResponse<RouteReadDto> result = controller.findAllFavoritesByFilter(
                42L, "route", Collections.emptyList(), "origin", Collections.emptyList(), "dest",
                1L, 10L, 5L, 20L, 4.5f, pageable);

        assertThat(result).isEqualTo(expected);
        verify(routeService).findAllFavoritesByFilter(eq(42L), any(RouteFilterDto.class), eq(pageable));
    }

    @org.junit.jupiter.api.Test
    void create_ReturnsCreatedRouteReadDto_WhenValidDto() {
        RouteCreateOrUpdateDto dto = mock(RouteCreateOrUpdateDto.class);
        RouteReadDto expected = mock(RouteReadDto.class);
        when(routeService.create(dto)).thenReturn(expected);

        RouteReadDto result = controller.create(dto);

        assertThat(result).isEqualTo(expected);
        verify(routeService).create(dto);
    }

    @org.junit.jupiter.api.Test
    void update_CallsServiceUpdate_WithCorrectArguments() {
        RouteCreateOrUpdateDto dto = mock(RouteCreateOrUpdateDto.class);

        controller.update(5L, dto);

        verify(routeService).update(5L, dto);
    }

    @org.junit.jupiter.api.Test
    void addToFavorites_DelegatesToUserRouteInfoService() {
        RouteUserDto dto = new RouteUserDto(1L, 2L);

        controller.addToFavorites(dto);

        verify(userRouteInfoService).addToFavorites(1L, 2L);
    }

    @org.junit.jupiter.api.Test
    void removeFromFavorites_DelegatesToUserRouteInfoService() {
        RouteUserDto dto = new RouteUserDto(3L, 4L);

        controller.removeFromFavorites(dto);

        verify(userRouteInfoService).removeFromFavorites(3L, 4L);
    }

    @org.junit.jupiter.api.Test
    void addToPassed_DelegatesToUserRouteInfoService() {
        RouteUserDto dto = new RouteUserDto(7L, 8L);

        controller.addToPassed(dto);

        verify(userRouteInfoService).addToPassed(7L, 8L);
    }

    @org.junit.jupiter.api.Test
    void removeFromPassed_DelegatesToUserRouteInfoService() {
        RouteUserDto dto = new RouteUserDto(9L, 10L);

        controller.removeFromPassed(dto);

        verify(userRouteInfoService).removeFromPassed(9L, 10L);
    }

    @org.junit.jupiter.api.Test
    void delete_CallsServiceDelete_WithCorrectId() {
        controller.delete(11L);

        verify(routeService).delete(11L);
    }

    @org.junit.jupiter.api.Test
    void findAllByFilter_ReturnsPageResponse_WithTagsAndWaypoints() {
        PageResponse<RouteReadDto> expected = mock(PageResponse.class);
        Pageable pageable = mock(Pageable.class);
        List<Tag> tags = List.of(Tag.PARK);
        List<String> waypoints = List.of("wp1", "wp2");
        when(routeService.findAllByFilter(any(RouteFilterDto.class), eq(pageable))).thenReturn(expected);

        PageResponse<RouteReadDto> result = controller.findAllByFilter(
                "name", tags, "origin", waypoints, "dest", 1L, 2L, 3L, 4L, 5.0f, pageable);

        assertThat(result).isEqualTo(expected);
        ArgumentCaptor<RouteFilterDto> captor = ArgumentCaptor.forClass(RouteFilterDto.class);
        verify(routeService).findAllByFilter(captor.capture(), eq(pageable));
        RouteFilterDto filter = captor.getValue();
        assertThat(filter.tags()).isEqualTo(tags);
        assertThat(filter.waypoints()).isEqualTo(waypoints);
    }
}