package by.smertex.core.service.impl;

import by.smertex.core.database.model.impl.PhoneCode;
import by.smertex.core.database.repository.PhoneCodeRepository;
import by.smertex.core.dto.event.PhoneNotificationEvent;
import by.smertex.core.dto.input.PhoneCodeDto;
import by.smertex.core.dto.input.PhoneNotificationDto;
import by.smertex.core.exception.InvalidCodeException;
import by.smertex.core.exception.KafkaRequestException;
import by.smertex.core.service.PhoneCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PhoneCodeServiceImpl implements PhoneCodeService {

    private final KafkaTemplate<String, PhoneNotificationEvent> kafkaTemplate;

    private final PhoneCodeRepository phoneCodeRepository;

    @Override
    public void save(PhoneCode phoneCode) {
        phoneCodeRepository.save(phoneCode);
    }

    @Override
    public void verifyCode(PhoneCodeDto dto) {
        phoneCodeRepository.findById(dto.phoneNumber())
                .filter(entity -> entity.getCode().equals(dto.code()))
                .orElseThrow(() -> new InvalidCodeException("Invalid phone number or code", HttpStatus.BAD_REQUEST.value()));
    }

    @Transactional
    public void send(PhoneNotificationDto dto) {
        kafkaTemplate.send("phone-notification-events-topic", null, new PhoneNotificationEvent(dto.phoneNumber()))
                .exceptionally(exception -> {
                    throw new KafkaRequestException(exception.getMessage());
                });
    }
}
