package by.smertex.api;

import by.smertex.core.dto.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.input.RouteFilterDto;
import by.smertex.core.dto.input.RouteUserDto;
import by.smertex.core.dto.output.PageResponse;
import by.smertex.core.dto.output.RouteReadDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RouteController {

    RouteReadDto findById(Long id);

    PageResponse<RouteReadDto> findAllByFilter(RouteFilterDto filter, Pageable pageable);

    PageResponse<RouteReadDto> findAllFavoritesByFilter(Long userId, RouteFilterDto filter, Pageable pageable);

    PageResponse<RouteReadDto> findAllPassedByFilter(Long userId, RouteFilterDto filter, Pageable pageable);

    RouteReadDto create(RouteCreateOrUpdateDto dto);

    void update(Long id, RouteCreateOrUpdateDto dto);

    void addToFavorites(RouteUserDto routeUserDto);

    void removeFromFavorites(RouteUserDto routeUserDto);

    void addToPassed(RouteUserDto routeUserDto);

    void removeFromPassed(RouteUserDto routeUserDto);

    void delete(Long id);
}
