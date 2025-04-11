package by.smertex.api;

import by.smertex.core.dto.input.SubscriptionDataDto;
import org.springframework.http.ResponseEntity;

public interface SubscriptionController {
    ResponseEntity<Void> subscribe(SubscriptionDataDto subscriptionDataDto);
}
