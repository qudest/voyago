package by.smertex.api;

import by.smertex.core.dto.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.input.RouteFilter;
import by.smertex.core.dto.output.RouteReadDto;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RouteController {

    ResponseEntity<RouteReadDto> findById(Long id);

    ResponseEntity<List<RouteReadDto>> findAll(RouteFilter filter, Pageable pageable);

    ResponseEntity<List<RouteReadDto>> findAllFavorites(Long userId);

    ResponseEntity<RouteReadDto> create(RouteCreateOrUpdateDto dto);

    ResponseEntity<RouteReadDto> update(Long id, RouteCreateOrUpdateDto dto);

    ResponseEntity<Void> rate(Long userId, Long rating);

    ResponseEntity<Void> addToFavorites(Long routeId, Long userId);

    ResponseEntity<Void> delete(Long id);
}
