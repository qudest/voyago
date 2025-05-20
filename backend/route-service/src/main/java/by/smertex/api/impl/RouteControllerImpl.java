package by.smertex.api.impl;

import by.smertex.api.RouteController;
import by.smertex.core.dto.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.input.RouteUserDto;
import by.smertex.core.dto.output.RouteReadDto;
import by.smertex.core.service.RouteService;
import by.smertex.core.service.UserRouteInfoService;
import jakarta.validation.Valid;
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
    public RouteReadDto findById(@PathVariable Long id) {
        return routeService.findById(id);
    }

    @GetMapping
    public List<RouteReadDto> findAll() {
        return routeService.findAll();
    }

    @GetMapping("/favorites")
    public List<RouteReadDto> findAllFavorites(@RequestParam("userId") Long userId) {
        return routeService.findAllFavorites(userId);
    }

    @GetMapping("/passed")
    public List<RouteReadDto> findAllPassed(@RequestParam("userId") Long userId) {
        return routeService.findAllPassed(userId);
    }

    @PostMapping
    public RouteReadDto create(@RequestBody @Valid RouteCreateOrUpdateDto dto) {
        return routeService.create(dto);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable("id") Long id, @RequestBody @Valid RouteCreateOrUpdateDto dto) {
        routeService.update(id, dto);
    }

    @PutMapping("/favorites")
    public void addToFavorites(@RequestBody @Valid RouteUserDto routeUserDto) {
        userRouteInfoService.addToFavorites(routeUserDto.routeId(), routeUserDto.userId());
    }

    @DeleteMapping("/favorites")
    public void removeFromFavorites(@RequestBody @Valid RouteUserDto routeUserDto) {
        userRouteInfoService.removeFromFavorites(routeUserDto.routeId(), routeUserDto.userId());
    }

    @PutMapping("/passed")
    public void addToPassed(@RequestBody @Valid RouteUserDto routeUserDto) {
        userRouteInfoService.addToPassed(routeUserDto.routeId(), routeUserDto.userId());
    }

    @DeleteMapping("/passed")
    public void removeFromPassed(@RequestBody @Valid RouteUserDto routeUserDto) {
        userRouteInfoService.removeFromPassed(routeUserDto.routeId(), routeUserDto.userId());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        routeService.delete(id);
    }
}
