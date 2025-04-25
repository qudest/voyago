package by.smertex.core.handler.kafka.impl;

import by.smertex.core.dto.event.PhoneNotificationEvent;
import by.smertex.core.handler.kafka.KafkaEventHandler;
import by.smertex.core.service.SendToPhoneService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PhoneNotificationEventHandler implements KafkaEventHandler<PhoneNotificationEvent> {

    private final SendToPhoneService sendToPhoneService;

    @KafkaListener(topics = "phone-notification-events-topic")
    public void receive(PhoneNotificationEvent event) {
        sendToPhoneService.send(event);
    }
}
