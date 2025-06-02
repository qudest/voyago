package by.smertex.core.dto.input;

import by.smertex.core.util.generator.Patterns;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record GenerateRouteDto(@NotBlank @Pattern(regexp = Patterns.PHONE_NUMBER) String phone,
                               String country,
                               String city) {
}
