package by.smertex.core.client;

import by.smertex.core.dto.service.ai.GenerateRouteDto;
import by.smertex.core.dto.service.route.output.RouteReadDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(value = "ai-service")
public interface GenerateRouteServiceClient {

    @PostMapping("/api/ai")
    RouteReadDto generateRoute(@RequestBody GenerateRouteDto dto);
}
