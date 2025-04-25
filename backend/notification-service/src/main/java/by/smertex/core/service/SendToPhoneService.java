package by.smertex.core.service;

import by.smertex.core.dto.event.PhoneNotificationEvent;

public interface SendToPhoneService {
    void send(PhoneNotificationEvent event);
}
