package by.smertex.core.dto.input;

import lombok.Builder;

@Builder
public record RefreshTokenDto(String phoneNumber,
                              String refreshToken) {
}
