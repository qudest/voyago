package by.smertex.api.controller;

import by.smertex.core.client.RouteServiceClient;
import by.smertex.core.dto.service.route.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.service.route.output.RouteReadDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routes")
@RequiredArgsConstructor
@Tag(name = "Контроллер маршрутов", description = "Контроллер для работы с маршрутами")
public class GatewayRouteService {

    private final RouteServiceClient routeServiceClient;

    @GetMapping("/{id}")
    @Operation(summary = "Поиск маршрута по id")
    ResponseEntity<RouteReadDto> findById(
            @PathVariable @Parameter(description = "Id маршрута", required = true) Long id) {
        return ResponseEntity.ok(
                routeServiceClient.findById(id)
        );
    }

    @GetMapping
    @Operation(summary = "Вывести все маршруты")
    ResponseEntity<List<RouteReadDto>> findAll() {
        return ResponseEntity.ok(
                routeServiceClient.findAll()
        );
    }

    @PostMapping
    @Operation(summary = "Создание маршрута")
    ResponseEntity<RouteReadDto> create(
            @RequestBody @Parameter(description = "Dto для создания/обновления маршрута", required = true) RouteCreateOrUpdateDto dto) {
        return ResponseEntity.ok(
                routeServiceClient.create(dto)
        );
    }

    @PutMapping("/{id}")
    @Operation(summary = "Обновление маршрута")
    ResponseEntity<Void> update(
            @PathVariable @Parameter(description = "Id маршрута", required = true) Long id,
            @RequestBody @Parameter(description = "Dto для создания/обновления маршрута", required = true) RouteCreateOrUpdateDto dto) {
        routeServiceClient.update(id, dto);
        return ResponseEntity.ok()
                .build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Удаление маршрута")
    ResponseEntity<Void> delete(@PathVariable @Parameter(description = "Id маршрута", required = true) Long id) {
        routeServiceClient.delete(id);
        return ResponseEntity.ok()
                .build();
    }
}
