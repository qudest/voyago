package by.smertex.core.service;

import by.smertex.core.dto.input.PhoneDto;

public interface SendCodeService {
    void send(PhoneDto phoneDto);
}
