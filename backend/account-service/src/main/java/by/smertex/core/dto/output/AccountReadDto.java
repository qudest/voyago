package by.smertex.core.dto.output;

import by.smertex.core.database.entity.Preference;
import by.smertex.core.database.entity.Role;
import by.smertex.core.database.entity.Status;

import java.time.LocalDateTime;
import java.util.List;

public record AccountReadDto(String phoneNumber,
                             String secretName,
                             Role role,
                             Status status,
                             Boolean premium,
                             LocalDateTime endDate,
                             String country,
                             String city,
                             List<Preference> preferences,
                             String creditCard) {
}
