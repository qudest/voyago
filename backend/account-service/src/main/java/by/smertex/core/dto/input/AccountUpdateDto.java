package by.smertex.core.dto.input;

import by.smertex.core.database.model.impl.Preference;
import by.smertex.core.util.Patterns;
import jakarta.validation.constraints.*;
import lombok.Builder;

import java.util.List;

@Builder
public record AccountUpdateDto(@NotBlank @Size(min = 6, max = 24) String name,
                               String country,
                               String city,
                               List<Preference> preferences,
                               @Pattern(regexp = Patterns.CREDIT_CARD_NUMBER) String creditCard) {
}
