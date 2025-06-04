package by.smertex.api;

import by.smertex.core.dto.input.GenerateRouteDto;
import by.smertex.core.dto.output.RouteReadDto;
import jakarta.validation.Valid;

public interface GenerateRouteController {
    RouteReadDto generateRoute(@Valid GenerateRouteDto dto);
}
