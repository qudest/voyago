package by.smertex.core.dto.event;

import lombok.Builder;

@Builder
public record PhoneNotificationEvent(String phoneNumber,
                                     Integer code) {
}
