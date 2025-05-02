package by.smertex.api;

import by.smertex.core.dto.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.output.RouteReadDto;

import java.util.List;

public interface RouteController {

    RouteReadDto findById(Long id);

    List<RouteReadDto> findAll();

    List<RouteReadDto> findAllFavorites(Long userId);

    RouteReadDto create(RouteCreateOrUpdateDto dto);

    void update(Long id, RouteCreateOrUpdateDto dto);

    void addToFavorites(Long routeId, Long userId);

    void delete(Long id);
}
