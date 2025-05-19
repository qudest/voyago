package by.smertex.core.client;

import by.smertex.core.dto.service.route.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.service.route.output.RouteReadDto;
import feign.Param;
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
    List<RouteReadDto> findAllFavorites(@Param("userId") Long userId);

    @GetMapping("/api/routes/passed")
    List<RouteReadDto> findAllPassed(@Param ("userId") Long userId);

    @PutMapping(value = "/api/routes/favorites", params = {"routeId", "userId"})
    void addToFavorites(@Param ("routeId") Long routeId, @Param ("userId") Long userId);

    @DeleteMapping(value = "/api/routes/favorites", params = {"routeId", "userId"})
    void removeFromFavorites(@Param ("routeId") Long routeId, @Param ("userId") Long userId);

    @PutMapping(value = "/api/routes/passed", params = {"routeId", "userId"})
    void addToPassed(@Param ("routeId") Long routeId, @Param ("userId") Long userId);

    @DeleteMapping(value = "/api/routes/passed", params = {"routeId", "userId"})
    void removeFromPassed(@Param ("routeId") Long routeId, @Param ("userId") Long userId);
}
