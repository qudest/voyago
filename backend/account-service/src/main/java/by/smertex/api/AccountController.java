package by.smertex.api;

import by.smertex.core.dto.input.AccountPhoneDto;
import by.smertex.core.dto.input.AccountUpdateDto;
import by.smertex.core.dto.output.AccountReadDto;
import org.springframework.http.ResponseEntity;

public interface AccountController {
    ResponseEntity<AccountReadDto> findByPhoneNumber(AccountPhoneDto dto);

    ResponseEntity<Void> update(Long id, AccountUpdateDto dto);

    ResponseEntity<Void> buyPremium(Long id);

    ResponseEntity<Void> delete(Long id);
}
