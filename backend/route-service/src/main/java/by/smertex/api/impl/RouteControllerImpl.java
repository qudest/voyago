package by.smertex.api.impl;

import by.smertex.api.RouteController;
import by.smertex.core.dto.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.input.RouteFilter;
import by.smertex.core.dto.output.RouteReadDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/route")
@RequiredArgsConstructor
public class RouteControllerImpl implements RouteController {

    @GetMapping("/{id}")
    public ResponseEntity<RouteReadDto> findById(Long id) {
        return null;
    }

    @GetMapping
    public ResponseEntity<List<RouteReadDto>> findAll(RouteFilter filter, Pageable pageable) {
        return null;
    }

    @GetMapping("/favorites/{user-id}")
    public ResponseEntity<List<RouteReadDto>> findAllFavorites(Long userId) {
        return null;
    }

    @PostMapping
    public ResponseEntity<RouteReadDto> create(RouteCreateOrUpdateDto dto) {
        return null;
    }

    @PutMapping
    public ResponseEntity<RouteReadDto> update(Long id, RouteCreateOrUpdateDto dto) {
        return null;
    }

    @PutMapping("/rate")
    public ResponseEntity<Void> rate(Long userId, Long rating) {
        return null;
    }

    @PutMapping("/favorites")
    public ResponseEntity<Void> addToFavorites(Long routeId, Long userId) {
        return null;
    }

    public ResponseEntity<Void> delete(Long id) {
        return null;
    }
}
