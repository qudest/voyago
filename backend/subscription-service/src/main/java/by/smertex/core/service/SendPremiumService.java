package by.smertex.core.service;

import by.smertex.core.dto.event.PaymentSubscriptionEvent;

public interface SendPremiumService {
    void sendPremium(PaymentSubscriptionEvent event);
}
