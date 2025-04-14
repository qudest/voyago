package by.smertex.core.service;

import by.smertex.core.database.model.impl.PhoneCode;
import by.smertex.core.dto.input.PhoneCodeDto;
import by.smertex.core.dto.input.PhoneNotificationDto;

public interface PhoneCodeService {

    void save(PhoneCode phoneCode);

    void verifyCode(PhoneCodeDto dto);

    void send(PhoneNotificationDto phoneNotificationDto);
}