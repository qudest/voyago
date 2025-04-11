package by.smertex.core.dto.input;

import by.smertex.core.database.model.impl.Preference;
import lombok.Builder;

import java.util.List;

@Builder
public record AccountUpdateDto(String country,
                               String city,
                               List<Preference> preferences,
                               String creditCard) {
}
