package by.smertex.core.client;

import by.smertex.core.dto.service.route.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.service.route.output.RouteReadDto;
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
}
