package by.smertex.core.service.impl;

import by.smertex.core.dto.input.PhoneCodeDto;
import by.smertex.core.dto.input.RefreshTokenDto;
import by.smertex.core.dto.output.TokenDto;
import by.smertex.core.service.JwtService;
import by.smertex.core.service.PhoneCodeService;
import by.smertex.core.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService {

    private final PhoneCodeService phoneCodeService;

    private final JwtUtil jwtUtil;

    public TokenDto generateToken(PhoneCodeDto dto) {
        phoneCodeService.verifyCode(dto);
        return null;
    }

    public TokenDto updateToken(RefreshTokenDto dto) {
        return null;
    }
}
