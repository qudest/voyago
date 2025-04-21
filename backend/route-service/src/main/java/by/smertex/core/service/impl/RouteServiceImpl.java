package by.smertex.core.service.impl;

import by.smertex.core.dto.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.input.RouteFilter;
import by.smertex.core.dto.output.RouteReadDto;
import by.smertex.core.service.RouteService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RouteServiceImpl implements RouteService {

    @Override
    public RouteReadDto findById(Long id) {
        return null;
    }

    @Override
    public List<RouteReadDto> findAll(RouteFilter filter, Pageable pageable) {
        return List.of();
    }

    @Override
    public List<RouteReadDto> findAllFavorites(Long userId) {
        return List.of();
    }

    @Override
    public RouteReadDto create(RouteCreateOrUpdateDto dto) {
        return null;
    }

    @Override
    public RouteReadDto update(Long id, RouteCreateOrUpdateDto dto) {
        return null;
    }

    @Override
    public void addToFavorites(Long routeId, Long userId) {

    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public void rate(Long userId, Long rating) {

    }


}
