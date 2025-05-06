package by.smertex.core.dto.input;

import by.smertex.core.util.Patterns;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record SubscriptionDataDto(@NotBlank @Pattern(regexp = Patterns.PHONE_NUMBER) String phoneNumber) {
}
