package by.smertex.core.handler.kafka.impl;

import by.smertex.core.database.model.impl.PhoneCode;
import by.smertex.core.dto.event.PhoneCodeEvent;
import by.smertex.core.handler.kafka.AbstractKafkaHandler;
import by.smertex.core.service.PhoneCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PhoneCodeHandler implements AbstractKafkaHandler<PhoneCodeEvent> {

    private final PhoneCodeService phoneCodeService;

    @KafkaListener(topics = "phone-code-events-topic")
    public void receive(PhoneCodeEvent event) {
        phoneCodeService.save(
                PhoneCode.builder()
                        .phoneNumber(event.phoneNumber())
                        .code(event.code())
                        .build()
        );
    }
}