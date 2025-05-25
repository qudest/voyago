package by.smertex.core.service;

import by.smertex.core.dto.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.input.RouteFilterDto;
import by.smertex.core.dto.output.PageResponse;
import by.smertex.core.dto.output.RouteReadDto;
import org.springframework.data.domain.Pageable;

public interface RouteService {

    RouteReadDto findById(Long id);

    PageResponse<RouteReadDto> findAllByFilter(RouteFilterDto routeFilter, Pageable pageable);

    PageResponse<RouteReadDto> findAllFavoritesByFilter(Long userId, RouteFilterDto routeFilter, Pageable pageable);

    PageResponse<RouteReadDto> findAllPassedByFilter(Long userId, RouteFilterDto routeFilter, Pageable pageable);

    RouteReadDto create(RouteCreateOrUpdateDto dto);

    void update(Long id, RouteCreateOrUpdateDto dto);

    void delete(Long id);
}
