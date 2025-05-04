package by.smertex.core.client;

import by.smertex.core.dto.service.subscription.input.SubscriptionDataDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(value = "subscription-service")
public interface SubscriptionServiceClient {
    @PostMapping("/api/subscription")
    Void subscribe(@RequestBody SubscriptionDataDto subscriptionDataDto);
}
