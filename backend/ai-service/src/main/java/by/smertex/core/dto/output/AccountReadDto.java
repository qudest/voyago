package by.smertex.core.dto.output;

import by.smertex.core.database.model.Role;
import by.smertex.core.database.model.Status;
import by.smertex.core.database.model.Tag;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record AccountReadDto(Long id,
                             String phoneNumber,
                             String name,
                             Role role,
                             Status status,
                             Boolean premium,
                             LocalDateTime endDate,
                             String country,
                             String city,
                             List<Tag> preferences,
                             String creditCard) {
}
