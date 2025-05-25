package by.smertex.api.controller;

import by.smertex.core.dto.service.route.Tag;
import by.smertex.core.dto.service.route.input.RouteCreateOrUpdateDto;
import by.smertex.core.dto.service.route.input.RouteUserDto;
import by.smertex.core.dto.service.route.output.PageResponse;
import by.smertex.core.dto.service.route.output.RouteReadDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;

import java.util.List;

@io.swagger.v3.oas.annotations.tags.Tag(name = "Контроллер маршрутов", description = "Контроллер для работы с маршрутами")
public interface GatewayRouteController {

    @Operation(summary = "Поиск маршрута по id")
    RouteReadDto findById(@Parameter(description = "Id маршрута", required = true)
                                          Long id
    );

    @Operation(summary = "Поиск маршрутов по фильтру")
    PageResponse<RouteReadDto> findAllByFilter(
            @Parameter(description = "Название маршрута") String name,
            @Parameter(description = "Теги маршрута") List<Tag> tags,
            @Parameter(description = "Стартовая точка маршрута") String origin,
            @Parameter(description = "Промежуточные точки маршрута") List<String> waypoints,
            @Parameter(description = "Конечная точка маршрута") String destination,
            @Parameter(description = "Дистанция от") Long distanceFrom,
            @Parameter(description = "Дистанция до") Long distanceTo,
            @Parameter(description = "Длительность от") Long durationFrom,
            @Parameter(description = "Длительность до") Long durationTo,
            @Parameter(description = "Средний рейтинг") Float rating
    );

    @Operation(summary = "Поиск избранных маршрутов по фильтру")
    PageResponse<RouteReadDto> findAllFavoritesByFilter(
            @Parameter(description = "Id пользователя", required = true) Long userId,
            @Parameter(description = "Название маршрута") String name,
            @Parameter(description = "Теги маршрута") List<Tag> tags,
            @Parameter(description = "Стартовая точка маршрута") String origin,
            @Parameter(description = "Промежуточные точки маршрута") List<String> waypoints,
            @Parameter(description = "Конечная точка маршрута") String destination,
            @Parameter(description = "Дистанция от") Long distanceFrom,
            @Parameter(description = "Дистанция до") Long distanceTo,
            @Parameter(description = "Длительность от") Long durationFrom,
            @Parameter(description = "Длительность до") Long durationTo,
            @Parameter(description = "Средний рейтинг") Float rating

    );

    @Operation(summary = "Поиск пройденных маршрутов по фильтру")
    PageResponse<RouteReadDto> findAllPassedByFilter(
            @Parameter(description = "Id пользователя", required = true) Long userId,
            @Parameter(description = "Название маршрута") String name,
            @Parameter(description = "Теги маршрута") List<Tag> tags,
            @Parameter(description = "Стартовая точка маршрута") String origin,
            @Parameter(description = "Промежуточные точки маршрута") List<String> waypoints,
            @Parameter(description = "Конечная точка маршрута") String destination,
            @Parameter(description = "Дистанция от") Long distanceFrom,
            @Parameter(description = "Дистанция до") Long distanceTo,
            @Parameter(description = "Длительность от") Long durationFrom,
            @Parameter(description = "Длительность до") Long durationTo,
            @Parameter(description = "Средний рейтинг") Float rating
    );


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
