package by.smertex.core.service.impl;

import by.smertex.core.database.model.impl.PhoneCode;
import by.smertex.core.dto.event.PhoneNotificationEvent;
import by.smertex.core.dto.input.PhoneDto;
import by.smertex.core.exception.KafkaRequestException;
import by.smertex.core.service.PhoneCodeService;
import by.smertex.core.service.SendCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SendCodeServiceImpl implements SendCodeService {

    private final KafkaTemplate<String, PhoneNotificationEvent> kafkaTemplate;

    private final PhoneCodeService phoneCodeService;

    @Transactional
    public void send(PhoneDto dto) {
        PhoneCode phoneCode = phoneCodeService.generate(dto.phoneNumber());
        PhoneNotificationEvent event = PhoneNotificationEvent.builder()
                .phoneNumber(phoneCode.getPhoneNumber())
                .code(phoneCode.getCode())
                .build();

        kafkaTemplate.send("phone-notification-events-topic", phoneCode.getPhoneNumber(), event)
                .exceptionally(exception -> {
                    throw new KafkaRequestException(exception.getMessage());
                });
    }
}
