package by.smertex.api;

import by.smertex.core.dto.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.input.RouteFilter;
import by.smertex.core.dto.output.RouteReadDto;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RouteController {

    RouteReadDto findById(Long id);

    List<RouteReadDto> findAll(RouteFilter filter, Pageable pageable);

    List<RouteReadDto> findAllFavorites(Long userId);

    RouteReadDto create(RouteCreateOrUpdateDto dto);

    RouteReadDto update(Long id, RouteCreateOrUpdateDto dto);

    void addToFavorites(Long routeId, Long userId);

    void delete(Long id);
}
