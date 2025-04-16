package by.smertex.core.service;

import by.smertex.core.dto.input.SubscriptionDataDto;

public interface SubscriptionService {
    void pay(SubscriptionDataDto dto);
}
