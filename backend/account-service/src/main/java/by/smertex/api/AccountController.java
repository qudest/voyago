package by.smertex.api;

import by.smertex.core.database.entity.Preference;
import by.smertex.core.dto.input.AccountUpdateDto;
import by.smertex.core.dto.output.AccountReadDto;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.List;

public interface AccountController {
    ResponseEntity<AccountReadDto> findByPhoneNumber(String phoneNumber);

    ResponseEntity<AccountReadDto> update(Long id, AccountUpdateDto dto);

    ResponseEntity<Void> updatePremium(Long id, LocalDateTime endDate);

    ResponseEntity<Void> addPreferences(Long id, List<Preference> preferences);

    ResponseEntity<Void> delete(Long id);
}
