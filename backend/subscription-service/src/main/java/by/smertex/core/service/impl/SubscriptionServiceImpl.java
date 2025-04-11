package by.smertex.core.service.impl;

import by.smertex.core.dto.event.PaymentSubscriptionEvent;
import by.smertex.core.dto.input.SubscriptionDataDto;
import by.smertex.core.exception.KafkaResponseException;
import by.smertex.core.service.SendPremiumService;
import by.smertex.core.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class SubscriptionServiceImpl implements SubscriptionService, SendPremiumService {

    private final KafkaTemplate<String, PaymentSubscriptionEvent> kafkaTemplate;

    private SendPremiumService sendPremiumService;

    //TODO: Нужна интеграция с внешним API оплаты. Здесь стоит заглушка
    @Transactional
    public void pay(SubscriptionDataDto dto) {
        sendPremiumService.sendPremium(
                PaymentSubscriptionEvent.builder()
                        .phoneNumber(dto.phoneNumber())
                        .endDate(LocalDateTime.now().plusMonths(1))
                        .build()
        );
    }

    @Transactional
    public void sendPremium(PaymentSubscriptionEvent event) {
        kafkaTemplate.send("payment-subscriptions-events-topic", null, event)
                .exceptionally(exception -> {
                    throw new KafkaResponseException(exception.getMessage());
                });
    }

    @Autowired
    @Lazy
    private void setSendPremiumService(SendPremiumService sendPremiumService) {
        this.sendPremiumService = sendPremiumService;
    }
}
