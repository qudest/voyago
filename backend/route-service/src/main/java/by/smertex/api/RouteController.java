package by.smertex.api;

import by.smertex.core.dto.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.input.RouteUserDto;
import by.smertex.core.dto.output.RouteReadDto;

import java.util.List;

public interface RouteController {

    RouteReadDto findById(Long id);

    List<RouteReadDto> findAll();

    List<RouteReadDto> findAllFavorites(Long userId);

    List<RouteReadDto> findAllPassed(Long userId);

    RouteReadDto create(RouteCreateOrUpdateDto dto);

    void update(Long id, RouteCreateOrUpdateDto dto);

    void addToFavorites(RouteUserDto routeUserDto);

    void removeFromFavorites(RouteUserDto routeUserDto);

    void addToPassed(RouteUserDto routeUserDto);

    void removeFromPassed(RouteUserDto routeUserDto);

    void delete(Long id);
}
