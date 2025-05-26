package by.smertex.api;

import by.smertex.core.dto.input.SubscriptionDataDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;

public interface SubscriptionController {
    ResponseEntity<Void> subscribe(@Valid SubscriptionDataDto subscriptionDataDto);
}
