package by.smertex.api.controller;

import by.smertex.core.dto.service.route.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.service.route.output.RouteReadDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Tag(name = "Контроллер маршрутов", description = "Контроллер для работы с маршрутами")
public interface GatewayRouteController {

    @Operation(summary = "Поиск маршрута по id")
    ResponseEntity<RouteReadDto> findById(@Parameter(description = "Id маршрута", required = true)
                                          Long id
    );

    @Operation(summary = "Вывести все маршруты")
    ResponseEntity<List<RouteReadDto>> findAll();

    @Operation(summary = "Создание маршрута")
    ResponseEntity<RouteReadDto> create(@Parameter(description = "Dto для создания/обновления маршрута", required = true)
                                        RouteCreateOrUpdateDto dto
    );

    @Operation(summary = "Обновление маршрута")
    ResponseEntity<Void> update(
            @Parameter(description = "Id маршрута", required = true)
            Long id,
            @Parameter(description = "Dto для создания/обновления маршрута", required = true)
            RouteCreateOrUpdateDto dto
    );

    @Operation(summary = "Удаление маршрута")
    ResponseEntity<Void> delete(
            @Parameter(description = "Id маршрута", required = true)
            Long id
    );
}
