package by.smertex.core.dto.service.account.output;

import by.smertex.core.dto.service.account.Preference;
import by.smertex.core.dto.service.account.Role;
import by.smertex.core.dto.service.account.Status;
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
                             List<Preference> preferences,
                             String creditCard) {
}
