package by.smertex.core.handler.kafka;

import by.smertex.core.dto.event.PaymentSubscriptionEvent;
import by.smertex.core.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PaymentSubscriptionEventHandler {
    private final SubscriptionService subscriptionService;

    @KafkaListener(topics = "payment-subscriptions-events-topic")
    public void receive(PaymentSubscriptionEvent event) {
        subscriptionService.buyPremium(event.phoneNumber(), event.endDate());
    }
}
