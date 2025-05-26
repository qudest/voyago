package by.smertex.core.dto.input;

import by.smertex.core.util.Patterns;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;

@Builder
public record PhoneCodeDto(@NotBlank @Pattern(regexp = Patterns.PHONE_NUMBER) String phoneNumber,
                           Integer code) {
}
