package by.smertex.core.dto.service.auth.input;

import lombok.Builder;

@Builder
public record PhoneCodeDto(String phoneNumber,
                           Integer code) {
}
