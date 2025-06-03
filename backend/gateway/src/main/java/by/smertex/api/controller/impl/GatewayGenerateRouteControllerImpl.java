package by.smertex.api.controller.impl;

import by.smertex.api.controller.GatewayGenerateRouteController;
import by.smertex.core.client.GenerateRouteServiceClient;
import by.smertex.core.dto.service.ai.GenerateRouteDto;
import by.smertex.core.dto.service.route.output.RouteReadDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class GatewayGenerateRouteControllerImpl implements GatewayGenerateRouteController {

    private final GenerateRouteServiceClient generateRouteServiceClient;

    @PostMapping
    public RouteReadDto generateRoute(@RequestBody GenerateRouteDto generateRouteDto) {
        return generateRouteServiceClient.generateRoute(generateRouteDto);
    }
}
