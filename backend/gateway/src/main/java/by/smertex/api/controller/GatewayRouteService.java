package by.smertex.api.controller;

import by.smertex.core.client.RouteServiceClient;
import by.smertex.core.dto.service.route.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.service.route.output.RouteReadDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routes")
@RequiredArgsConstructor
public class GatewayRouteService {

    private final RouteServiceClient routeServiceClient;

    @GetMapping("/{id}")
    ResponseEntity<RouteReadDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(
                routeServiceClient.findById(id)
        );
    }

    @GetMapping
    ResponseEntity<List<RouteReadDto>> findAll() {
        return ResponseEntity.ok(
                routeServiceClient.findAll()
        );
    }

    @PostMapping
    ResponseEntity<RouteReadDto> create(@RequestBody RouteCreateOrUpdateDto dto) {
        return ResponseEntity.ok(
                routeServiceClient.create(dto)
        );
    }

    @PutMapping("/{id}")
    ResponseEntity<Void> update(@PathVariable Long id, @RequestBody RouteCreateOrUpdateDto dto) {
        routeServiceClient.update(id, dto);
        return ResponseEntity.ok()
                .build();
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> delete(@PathVariable Long id) {
        routeServiceClient.delete(id);
        return ResponseEntity.ok()
                .build();
    }
}
