package by.smertex.core.client;

import by.smertex.core.configuration.FeignConfig;
import by.smertex.core.dto.service.route.input.RouteCreateOrUpdateDto;
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

    @PutMapping(value = "/api/routes/favorites", params = {"routeId", "userId"})
    void addToFavorites(@RequestParam("routeId") Long routeId, @RequestParam("userId") Long userId);

    @DeleteMapping(value = "/api/routes/favorites", params = {"routeId", "userId"})
    void removeFromFavorites(@RequestParam("routeId") Long routeId, @RequestParam("userId") Long userId);

    @PutMapping(value = "/api/routes/passed", params = {"routeId", "userId"})
    void addToPassed(@RequestParam("routeId") Long routeId, @RequestParam("userId") Long userId);

    @DeleteMapping(value = "/api/routes/passed", params = {"routeId", "userId"})
    void removeFromPassed(@RequestParam("routeId") Long routeId, @RequestParam("userId") Long userId);
}
