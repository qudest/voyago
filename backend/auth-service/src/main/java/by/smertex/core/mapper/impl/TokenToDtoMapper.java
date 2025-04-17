package by.smertex.core.mapper.impl;

import by.smertex.core.database.model.impl.Token;
import by.smertex.core.dto.output.TokenDto;
import by.smertex.core.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class TokenToDtoMapper implements Mapper<Token, TokenDto> {

    public TokenDto map(Token from) {
        return TokenDto.builder()
                .accessToken(from.getAccessToken())
                .refreshToken(from.getRefreshToken())
                .build();
    }
}
