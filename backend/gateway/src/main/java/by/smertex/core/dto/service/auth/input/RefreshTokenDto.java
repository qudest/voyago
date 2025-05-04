package by.smertex.core.dto.service.auth.input;

import lombok.Builder;

@Builder
public record RefreshTokenDto(String refreshToken) {
}