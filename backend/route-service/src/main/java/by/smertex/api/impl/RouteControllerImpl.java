package by.smertex.api.impl;

import by.smertex.api.RouteController;
import by.smertex.core.dto.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.output.RouteReadDto;
import by.smertex.core.service.RouteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routes")
@RequiredArgsConstructor
public class RouteControllerImpl implements RouteController {

    private final RouteService routeService;

    @GetMapping("/{id}")
    public RouteReadDto findById(@PathVariable Long id) {
        return routeService.findById(id);
    }

    @GetMapping
    public List<RouteReadDto> findAll() {
        return routeService.findAll();
    }

//    @GetMapping("/favorites")
//    public List<RouteReadDto> findAllFavorites(@RequestParam Long userId) {
//        return routeService.findAllFavorites(userId);
//    }

    @PostMapping
    public RouteReadDto create(@RequestBody @Valid RouteCreateOrUpdateDto dto) {
        return routeService.create(dto);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody @Valid RouteCreateOrUpdateDto dto) {
        routeService.update(id, dto);
    }

//    @PutMapping("/favorites")
//    public void addToFavorites(@RequestParam Long routeId, @RequestParam Long userId) {
//        routeService.addToFavorites(routeId, userId);
//    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        routeService.delete(id);
    }
}
