package by.smertex.core.dto.input;

import lombok.Builder;

@Builder
public record PhoneCodeDto(String phoneNumber,
                           Integer code) {
}
