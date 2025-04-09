package by.smertex.api;

import by.smertex.core.database.model.impl.Preference;
import by.smertex.core.dto.input.AccountUpdateDto;
import by.smertex.core.dto.output.AccountReadDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AccountController {
    ResponseEntity<AccountReadDto> findByPhoneNumber(String phoneNumber);

    ResponseEntity<Void> update(Long id, AccountUpdateDto dto);

    ResponseEntity<Void> buyPremium(Long id);

    ResponseEntity<Void> updatePreferences(Long id, List<Preference> preferences);

    ResponseEntity<Void> delete(Long id);
}
