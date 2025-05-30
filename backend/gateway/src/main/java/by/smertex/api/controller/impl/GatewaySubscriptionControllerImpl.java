package by.smertex.api.controller.impl;

import by.smertex.api.controller.GatewaySubscriptionController;
import by.smertex.core.client.SubscriptionServiceClient;
import by.smertex.core.dto.service.subscription.input.SubscriptionDataDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/subscription")
@RequiredArgsConstructor
public class GatewaySubscriptionControllerImpl implements GatewaySubscriptionController {

    private final SubscriptionServiceClient subscriptionServiceClient;

    @PostMapping
    public ResponseEntity<Void> subscribe(@RequestBody SubscriptionDataDto subscriptionDataDto) {
        return ResponseEntity.ok(
                subscriptionServiceClient.subscribe(subscriptionDataDto)
        );
    }
}
