package by.smertex.core.client;

import by.smertex.core.configuration.FeignConfig;
import by.smertex.core.dto.service.route.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.service.route.input.RouteUserDto;
import by.smertex.core.dto.service.route.output.RouteReadDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(value = "route-service", configuration = FeignConfig.class)
public interface RouteServiceClient {
    @GetMapping("/api/routes/{id}")
    RouteReadDto findById(@PathVariable Long id);

    @GetMapping("/api/routes")
    List<RouteReadDto> findAll();

    @PostMapping("/api/routes")
    RouteReadDto create(@RequestBody RouteCreateOrUpdateDto dto);

    @PutMapping("/api/routes/{id}")
    void update(@PathVariable Long id, @RequestBody RouteCreateOrUpdateDto dto);

    @DeleteMapping("/api/routes/{id}")
    void delete(@PathVariable Long id);

    @GetMapping("/api/routes/favorites")
    List<RouteReadDto> findAllFavorites(@RequestParam("userId") Long userId);

    @GetMapping("/api/routes/passed")
    List<RouteReadDto> findAllPassed(@RequestParam("userId") Long userId);

    @PutMapping(value = "/api/routes/favorites")
    void addToFavorites(@RequestBody RouteUserDto routeUserDto);

    @DeleteMapping(value = "/api/routes/favorites")
    void removeFromFavorites(@RequestBody RouteUserDto routeUserDto);

    @PutMapping(value = "/api/routes/passed")
    void addToPassed(@RequestBody RouteUserDto routeUserDto);

    @DeleteMapping(value = "/api/routes/passed")
    void removeFromPassed(@RequestBody RouteUserDto routeUserDto);
}
