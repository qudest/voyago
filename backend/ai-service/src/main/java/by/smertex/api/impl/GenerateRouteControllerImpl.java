package by.smertex.api.impl;

import by.smertex.api.GenerateRouteController;
import by.smertex.core.dto.input.GenerateRouteDto;
import by.smertex.core.dto.output.RouteReadDto;
import by.smertex.core.service.GenerateRouteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class GenerateRouteControllerImpl implements GenerateRouteController {

    private final GenerateRouteService generateRouteService;

    @GetMapping
    public RouteReadDto generateRoute(GenerateRouteDto dto) {
        return generateRouteService.generateRoute(dto);
    }
}
