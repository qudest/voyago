package by.smertex.api;

import by.smertex.core.database.model.Tag;
import by.smertex.core.dto.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.input.RouteUserDto;
import by.smertex.core.dto.output.PageResponse;
import by.smertex.core.dto.output.RouteReadDto;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface RouteController {

    RouteReadDto findById(Long id);

    PageResponse<RouteReadDto> findAllByFilter(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) List<Tag> tags,
            @RequestParam(required = false) String origin,
            @RequestParam(required = false) List<String> waypoints,
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) Long distanceFrom,
            @RequestParam(required = false) Long distanceTo,
            @RequestParam(required = false) Long durationFrom,
            @RequestParam(required = false) Long durationTo,
            @RequestParam(required = false) Float rating,
            Pageable pageable
    );

    PageResponse<RouteReadDto> findAllFavoritesByFilter(
            @RequestParam() Long userId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) List<Tag> tags,
            @RequestParam(required = false) String origin,
            @RequestParam(required = false) List<String> waypoints,
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) Long distanceFrom,
            @RequestParam(required = false) Long distanceTo,
            @RequestParam(required = false) Long durationFrom,
            @RequestParam(required = false) Long durationTo,
            @RequestParam(required = false) Float rating,
            Pageable pageable
    );

    PageResponse<RouteReadDto> findAllPassedByFilter(
            @RequestParam() Long userId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) List<Tag> tags,
            @RequestParam(required = false) String origin,
            @RequestParam(required = false) List<String> waypoints,
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) Long distanceFrom,
            @RequestParam(required = false) Long distanceTo,
            @RequestParam(required = false) Long durationFrom,
            @RequestParam(required = false) Long durationTo,
            @RequestParam(required = false) Float rating,
            Pageable pageable
    );

    RouteReadDto create(RouteCreateOrUpdateDto dto);

    void update(Long id, RouteCreateOrUpdateDto dto);

    void addToFavorites(RouteUserDto routeUserDto);

    void removeFromFavorites(RouteUserDto routeUserDto);

    void addToPassed(RouteUserDto routeUserDto);

    void removeFromPassed(RouteUserDto routeUserDto);

    void delete(Long id);
}
