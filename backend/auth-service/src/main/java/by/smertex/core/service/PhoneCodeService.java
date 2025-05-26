package by.smertex.core.service;

import by.smertex.core.database.model.impl.PhoneCode;
import by.smertex.core.dto.input.PhoneCodeDto;

public interface PhoneCodeService {
    PhoneCode generate(String phoneNumber);

    void verifyCode(PhoneCodeDto dto);
}