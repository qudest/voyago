package by.smertex.api.impl;

import by.smertex.api.SubscriptionController;
import by.smertex.core.dto.input.SubscriptionDataDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/subscription")
@RequiredArgsConstructor
public class SubscriptionControllerImpl implements SubscriptionController {

    @PostMapping
    public ResponseEntity<Void> subscribe(@RequestBody SubscriptionDataDto subscriptionDataDto) {
        return null;
    }
}
