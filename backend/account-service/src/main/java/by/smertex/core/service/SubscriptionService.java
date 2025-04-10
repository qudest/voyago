package by.smertex.core.service;

import java.time.LocalDateTime;

public interface SubscriptionService {
    void buyPremium(String phoneNumber, LocalDateTime endDate);
}
