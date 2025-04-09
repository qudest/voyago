package by.smertex.core.dto.output;

import by.smertex.core.database.model.impl.Preference;
import by.smertex.core.database.model.impl.Role;
import by.smertex.core.database.model.impl.Status;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record AccountReadDto(String phoneNumber,
                             String name,
                             Role role,
                             Status status,
                             Boolean premium,
                             LocalDateTime endDate,
                             String country,
                             String city,
                             List<Preference> preferences,
                             String creditCard) {
}
