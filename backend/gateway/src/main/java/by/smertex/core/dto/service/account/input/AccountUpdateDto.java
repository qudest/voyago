package by.smertex.core.dto.service.account.input;

import by.smertex.core.dto.service.account.Preference;
import lombok.Builder;

import java.util.List;

@Builder
public record AccountUpdateDto(String name,
                               String country,
                               String city,
                               List<Preference> preferences,
                               String creditCard) {
}
