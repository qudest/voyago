package by.smertex.core.dto.output;

import lombok.Builder;

@Builder
public record TokenDto(String accessToken
                       //String refreshToken
) {
}
