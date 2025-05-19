package by.smertex.core.client;

import by.smertex.core.dto.service.route.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.service.route.output.RouteReadDto;
import jakarta.validation.constraints.NotNull;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(value = "route-service")
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
    List<RouteReadDto> findAllFavorites(Long userId);

    @GetMapping("/api/routes/passed")
    List<RouteReadDto> findAllPassed(Long userId);

    @PutMapping("/api/routes/favorites")
    void addToFavorites(@NotNull Long routeId, @NotNull Long userId);

    @DeleteMapping("/api/routes/favorites")
    void removeFromFavorites(@NotNull Long routeId, @NotNull Long userId);

    @PutMapping("/api/routes/passed")
    void addToPassed(@NotNull Long routeId, @NotNull Long userId);

    @DeleteMapping("/api/routes/passed")
    void removeFromPassed(@NotNull Long routeId, @NotNull Long userId);
}
