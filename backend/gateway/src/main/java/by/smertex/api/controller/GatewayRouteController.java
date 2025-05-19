package by.smertex.api.controller;

import by.smertex.core.dto.service.route.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.service.route.output.RouteReadDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@Tag(name = "Контроллер маршрутов", description = "Контроллер для работы с маршрутами")
public interface GatewayRouteController {

    @Operation(summary = "Поиск маршрута по id")
    RouteReadDto findById(@Parameter(description = "Id маршрута", required = true)
                                          Long id
    );

    @Operation(summary = "Вывести все маршруты")
    List<RouteReadDto> findAll();

    @Operation(summary = "Создание маршрута")
    RouteReadDto create(@Parameter(description = "Dto для создания/обновления маршрута", required = true)
                                        RouteCreateOrUpdateDto dto
    );

    @Operation(summary = "Вывести все избранные маршруты пользователя")
    List<RouteReadDto> findAllFavorites(@Parameter(description = "Id пользователя", required = true) Long userId);

    @Operation(summary = "Добавление маршрута в избранное")
    void addToFavorites(
            @Parameter(description = "Id маршрута", required = true)
            Long routeId,
            @Parameter(description = "Id пользователя", required = true)
            Long userId
    );

    @Operation(summary = "Удаление маршрута из избранного")
    void removeFromFavorites(
            @Parameter(description = "Id маршрута", required = true)
            Long routeId,
            @Parameter(description = "Id пользователя", required = true)
            Long userId
    );

    @Operation(summary = "Вывести все пройденные маршруты пользователя")
    List<RouteReadDto> findAllPassed(@Parameter(description = "Id пользователя", required = true) Long userId);

    @Operation(summary = "Добавление маршрута в пройденные")
    void addToPassed(
            @Parameter(description = "Id маршрута", required = true)
            Long routeId,
            @Parameter(description = "Id пользователя", required = true)
            Long userId
    );

    @Operation(summary = "Удаление маршрута из пройденных")
    void removeFromPassed(
            @Parameter(description = "Id маршрута", required = true)
            Long routeId,
            @Parameter(description = "Id пользователя", required = true)
            Long userId
    );


    @Operation(summary = "Обновление маршрута")
    void update(
            @Parameter(description = "Id маршрута", required = true)
            Long id,
            @Parameter(description = "Dto для создания/обновления маршрута", required = true)
            RouteCreateOrUpdateDto dto
    );

    @Operation(summary = "Удаление маршрута")
    void delete(
            @Parameter(description = "Id маршрута", required = true)
            Long id
    );
}
