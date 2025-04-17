package by.smertex.core.service.impl;

import by.smertex.core.dto.event.PhoneNotificationEvent;
import by.smertex.core.dto.input.PhoneDto;
import by.smertex.core.exception.KafkaRequestException;
import by.smertex.core.service.SendCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SendCodeServiceImpl implements SendCodeService {

    private final KafkaTemplate<String, PhoneNotificationEvent> kafkaTemplate;

    @Transactional
    public void send(PhoneDto dto) {
        kafkaTemplate.send("phone-notification-events-topic", null, new PhoneNotificationEvent(dto.phoneNumber()))
                .exceptionally(exception -> {
                    throw new KafkaRequestException(exception.getMessage());
                });
    }
}
