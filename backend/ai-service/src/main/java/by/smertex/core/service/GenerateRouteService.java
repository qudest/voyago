package by.smertex.core.service;

import by.smertex.core.dto.input.GenerateRouteDto;
import by.smertex.core.dto.output.RouteReadDto;

public interface GenerateRouteService {
    RouteReadDto generateRoute(GenerateRouteDto dto);
}
