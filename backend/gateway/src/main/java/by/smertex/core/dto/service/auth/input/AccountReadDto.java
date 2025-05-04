package by.smertex.core.dto.service.auth.input;

import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
public record AccountReadDto(Long id,
                             String phoneNumber,
                             String name,
                             String role,
                             String status,
                             Boolean premium,
                             LocalDateTime endDate,
                             String country,
                             String city,
                             List<String> preferences,
                             String creditCard) {
}
