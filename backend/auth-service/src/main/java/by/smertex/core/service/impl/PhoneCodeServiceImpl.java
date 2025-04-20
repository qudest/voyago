package by.smertex.core.service.impl;

import by.smertex.core.database.model.impl.PhoneCode;
import by.smertex.core.database.repository.PhoneCodeRepository;
import by.smertex.core.dto.input.PhoneCodeDto;
import by.smertex.core.exception.InvalidCodeException;
import by.smertex.core.service.PhoneCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PhoneCodeServiceImpl implements PhoneCodeService {

    private final PhoneCodeRepository phoneCodeRepository;

    public void save(PhoneCode phoneCode) {
        phoneCodeRepository.save(phoneCode);
    }

    public void verifyCode(PhoneCodeDto dto) {
        phoneCodeRepository.findById(dto.phoneNumber())
                .filter(entity -> entity.getCode().equals(dto.code()))
                .orElseThrow(() -> new InvalidCodeException("Invalid phone number or code", HttpStatus.BAD_REQUEST.value()));
    }
}
