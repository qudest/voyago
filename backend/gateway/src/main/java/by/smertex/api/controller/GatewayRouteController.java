package by.smertex.api.controller;

import by.smertex.core.dto.service.route.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.service.route.input.RouteFilterDto;
import by.smertex.core.dto.service.route.input.RouteUserDto;
import by.smertex.core.dto.service.route.output.PageResponse;
import by.smertex.core.dto.service.route.output.RouteReadDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Контроллер маршрутов", description = "Контроллер для работы с маршрутами")
public interface GatewayRouteController {

    @Operation(summary = "Поиск маршрута по id")
    RouteReadDto findById(@Parameter(description = "Id маршрута", required = true)
                                          Long id
    );

    @Operation(summary = "Поиск маршрутов по фильтру")
    PageResponse<RouteReadDto> findAllByFilter(
            @Parameter(description = "Фильтр") RouteFilterDto filter);

    @Operation(summary = "Поиск избранных маршрутов по фильтру")
    PageResponse<RouteReadDto> findAllFavoritesByFilter(
            @Parameter(description = "Id пользователя") Long userId, @Parameter(description = "Фильтр") RouteFilterDto filter);

    @Operation(summary = "Поиск пройденных маршрутов по фильтру")
    PageResponse<RouteReadDto> findAllPassedByFilter(
            @Parameter(description = "Id пользователя") Long userId, @Parameter(description = "Фильтр") RouteFilterDto filter);


    @Operation(summary = "Создание маршрута")
    RouteReadDto create(@Parameter(description = "Dto для создания/обновления маршрута", required = true)
                                        RouteCreateOrUpdateDto dto
    );

    @Operation(summary = "Добавление маршрута в избранное")
    void addToFavorites(
            @Parameter(description = "Dto c id маршрута и id пользователя") RouteUserDto routeUserDto
    );

    @Operation(summary = "Удаление маршрута из избранного")
    void removeFromFavorites(
            @Parameter(description = "Dto c id маршрута и id пользователя") RouteUserDto routeUserDto
    );

    @Operation(summary = "Добавление маршрута в пройденные")
    void addToPassed(
            @Parameter(description = "Dto c id маршрута и id пользователя") RouteUserDto routeUserDto
    );

    @Operation(summary = "Удаление маршрута из пройденных")
    void removeFromPassed(
            @Parameter(description = "Dto c id маршрута и id пользователя") RouteUserDto routeUserDto
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
