package by.smertex.core.dto.event;

import java.time.LocalDateTime;

public record PaymentSubscriptionEvent(String phoneNumber,
                                       LocalDateTime endDate) {
}
