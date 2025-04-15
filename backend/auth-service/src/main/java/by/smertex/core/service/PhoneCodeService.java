package by.smertex.core.service;

import by.smertex.core.database.model.impl.PhoneCode;
import by.smertex.core.dto.input.PhoneCodeDto;

public interface PhoneCodeService {
    void save(PhoneCode phoneCode);

    void verifyCode(PhoneCodeDto dto);
}