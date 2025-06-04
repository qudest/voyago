package by.smertex.core.service.impl;

import by.smertex.core.client.AccountServiceClient;
import by.smertex.core.database.model.impl.Token;
import by.smertex.core.dto.input.AccountReadDto;
import by.smertex.core.dto.input.PhoneCodeDto;
import by.smertex.core.dto.output.JwtClaims;
import by.smertex.core.dto.output.TokenDto;
import by.smertex.core.mapper.Mapper;
import by.smertex.core.service.JwtService;
import by.smertex.core.service.PhoneCodeService;
import by.smertex.core.util.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService {

    private final PhoneCodeService phoneCodeService;

    private final AccountServiceClient accountServiceClient;

    // private final TokenRepository tokenRepository;

    private final Mapper<Token, TokenDto> tokenDtoMapper;

    private final JwtUtil<AccountReadDto> jwtAccessUtil;

    // private final JwtUtil<String> jwtRefreshUtil;

    @Override
    public TokenDto generateToken(PhoneCodeDto dto) {
        if (!isTestAccount(dto.phoneNumber())) {
            phoneCodeService.verifyCode(dto);
        }
        String token = jwtAccessUtil.generateToken(
                accountServiceClient.findAccountByPhoneNumber(
                        dto.phoneNumber()
                )
        );
        return TokenDto.builder()
                .accessToken(token)
                .build();
    }

    private boolean isTestAccount(String phoneNumber) {
        return "79999999999".equals(phoneNumber) || "78005553535".equals(phoneNumber);
    }

    @Override
    public JwtClaims validateToken(String token) {
        jwtAccessUtil.validateToken(token);
        return JwtClaims.builder()
                .name(jwtAccessUtil.getUsername(token))
                .role(jwtAccessUtil.getRole(token))
                .build();
    }

//    public TokenDto generateToken(PhoneCodeDto dto) {
//        phoneCodeService.verifyCode(dto);
//        return Optional.ofNullable(findAccountService.findAccountByPhoneNumber(dto.phoneNumber()))
//                .map(account ->
//                        tokenRepository.save(
//                                Token.builder()
//                                        .phoneNumber(account.phoneNumber())
//                                        .accessToken(jwtAccessUtil.generateToken(account))
//                                        .refreshToken(jwtRefreshUtil.generateToken(account.phoneNumber()))
//                                        .build()
//                        )
//                )
//                .map(tokenDtoMapper::map)
//                .orElseThrow(() -> new GenerateJwtException("Generate jwt exception", HttpStatus.BAD_REQUEST.value()));
//    }

//    public TokenDto updateToken(RefreshTokenDto dto) {
//        jwtRefreshUtil.validateToken(dto.refreshToken());
//        String username = jwtRefreshUtil.getUsername(dto.refreshToken());
//        return tokenRepository.findById(username)
//                .map(entity -> {
//                    entity.setAccessToken(
//                            jwtAccessUtil.generateToken(
//                                    findAccountService.findAccountByPhoneNumber(username)
//                            )
//                    );
//                    return tokenRepository.save(entity);
//                })
//                .map(tokenDtoMapper::map)
//                .orElseThrow(() -> new InvalidRefreshException("Invalid refresh token", HttpStatus.UNAUTHORIZED.value()));
//    }
//
//    @Override
//    public void removeToken(String phoneNumber) {
//        tokenRepository.deleteById(phoneNumber);
//    }
}