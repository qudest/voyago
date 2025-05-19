package by.smertex.api.controller.impl;

import by.smertex.api.controller.GatewayRouteController;
import by.smertex.core.client.RouteServiceClient;
import by.smertex.core.dto.service.route.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.service.route.input.RouteUserDto;
import by.smertex.core.dto.service.route.output.RouteReadDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routes")
@RequiredArgsConstructor
public class GatewayRouteControllerImpl implements GatewayRouteController {

    private final RouteServiceClient routeServiceClient;

    @GetMapping("/{id}")
    public RouteReadDto findById(@PathVariable Long id) {
        return routeServiceClient.findById(id);
    }

    @GetMapping
    public List<RouteReadDto> findAll() {
        return routeServiceClient.findAll();
    }

    @PostMapping
    public RouteReadDto create(@RequestBody RouteCreateOrUpdateDto dto) {
        return routeServiceClient.create(dto);
    }

    @GetMapping("/favorites")
    public List<RouteReadDto> findAllFavorites(@RequestParam Long userId) {
        return routeServiceClient.findAllFavorites(userId);
    }

    @GetMapping("/passed")
    public List<RouteReadDto> findAllPassed(@RequestParam Long userId) {
        return routeServiceClient.findAllPassed(userId);
    }

    @PutMapping("/favorites")
    public void addToFavorites(@RequestBody RouteUserDto routeUserDto) {
        routeServiceClient.addToFavorites(routeUserDto);
    }

    @DeleteMapping("/favorites")
    public void removeFromFavorites(@RequestBody RouteUserDto routeUserDto) {
        routeServiceClient.removeFromFavorites(routeUserDto);
    }

    @PutMapping("/passed")
    public void addToPassed(@RequestBody RouteUserDto routeUserDto) {
        routeServiceClient.addToPassed(routeUserDto);
    }

    @DeleteMapping("/passed")
    public void removeFromPassed(@RequestBody RouteUserDto routeUserDto) {
        routeServiceClient.removeFromPassed(routeUserDto);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody RouteCreateOrUpdateDto dto) {
        routeServiceClient.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        routeServiceClient.delete(id);
    }
}
