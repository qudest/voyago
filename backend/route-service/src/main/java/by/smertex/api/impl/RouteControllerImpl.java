package by.smertex.api.impl;

import by.smertex.api.RouteController;
import by.smertex.core.dto.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.output.RouteReadDto;
import by.smertex.core.service.RouteService;
import by.smertex.core.service.UserRouteInfoService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routes")
@RequiredArgsConstructor
public class RouteControllerImpl implements RouteController {

    private final RouteService routeService;
    private final UserRouteInfoService userRouteInfoService;

    @GetMapping("/{id}")
    public RouteReadDto findById(@PathVariable @NotNull Long id) {
        return routeService.findById(id);
    }

    @GetMapping
    public List<RouteReadDto> findAll() {
        return routeService.findAll();
    }

    @GetMapping("/favorites")
    public List<RouteReadDto> findAllFavorites(@RequestParam Long userId) {
        return routeService.findAllFavorites(userId);
    }

    @GetMapping("/passed")
    public List<RouteReadDto> findAllPassed(@RequestParam Long userId) {
        return routeService.findAllPassed(userId);
    }

    @PostMapping
    public RouteReadDto create(@RequestBody @Valid RouteCreateOrUpdateDto dto) {
        return routeService.create(dto);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody @Valid RouteCreateOrUpdateDto dto) {
        routeService.update(id, dto);
    }

    @PutMapping("/favorites")
    public void addToFavorites(@RequestParam @NotNull Long routeId, @RequestParam @NotNull Long userId) {
        userRouteInfoService.addToFavorites(routeId, userId);
    }

    @DeleteMapping("/favorites")
    public void removeFromFavorites(@RequestParam @NotNull Long routeId, @RequestParam @NotNull Long userId) {
        userRouteInfoService.removeFromFavorites(routeId, userId);
    }

    @PutMapping("/passed")
    public void addToPassed(@RequestParam @NotNull Long routeId, @RequestParam @NotNull Long userId) {
        userRouteInfoService.addToPassed(routeId, userId);
    }

    @DeleteMapping("/passed")
    public void removeFromPassed(@RequestParam @NotNull Long routeId, @RequestParam @NotNull Long userId) {
        userRouteInfoService.removeFromPassed(routeId, userId);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable @NotNull Long id) {
        routeService.delete(id);
    }
}
