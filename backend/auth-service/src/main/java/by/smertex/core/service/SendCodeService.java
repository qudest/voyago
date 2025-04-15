package by.smertex.core.service;

import by.smertex.core.dto.input.PhoneNotificationDto;

public interface SendCodeService {
    void send(PhoneNotificationDto phoneNotificationDto);
}
