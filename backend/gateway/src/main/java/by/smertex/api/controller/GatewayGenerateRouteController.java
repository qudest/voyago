package by.smertex.api.controller;

import by.smertex.core.dto.service.ai.GenerateRouteDto;
import by.smertex.core.dto.service.route.output.RouteReadDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Сервис генерации маршрутов")
public interface GatewayGenerateRouteController {

    @Operation(summary = "Генерация маршрута")
    RouteReadDto generateRoute(@Parameter(description = "Dto для генерации маршрута") GenerateRouteDto generateRouteDto);
}
