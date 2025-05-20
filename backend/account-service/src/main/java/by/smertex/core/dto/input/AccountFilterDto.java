package by.smertex.core.dto.input;

import by.smertex.core.database.model.impl.Role;

public record AccountFilterDto(String phoneNumber,
                               String name,
                               Role role,
                               Boolean premium,
                               String country,
                               String city) {
}
