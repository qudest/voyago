package by.smertex.core.client;

import by.smertex.core.configuration.FeignConfig;
import by.smertex.core.dto.service.route.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.service.route.output.RouteReadDto;
import feign.Param;
import feign.RequestLine;
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

    @RequestLine("PUT /api/routes/favorites")
    void addToFavorites(@Param("routeId") Long routeId, @Param("userId") Long userId);

    @RequestLine("DELETE /api/routes/favorites")
    void removeFromFavorites(@Param("routeId") Long routeId, @Param("userId") Long userId);

    @RequestLine("PUT /api/routes/passed")
    void addToPassed(@Param("routeId") Long routeId, @Param("userId") Long userId);

    @RequestLine("DELETE /api/routes/passed")
    void removeFromPassed(@Param("routeId") Long routeId, @Param("userId") Long userId);
}
