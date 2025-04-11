package by.smertex.core.dto.event;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record PaymentSubscriptionEvent(String phoneNumber,
                                       LocalDateTime endDate) {
}
