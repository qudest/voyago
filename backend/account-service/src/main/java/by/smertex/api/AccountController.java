package by.smertex.api;

import by.smertex.core.dto.input.AccountUpdateDto;
import by.smertex.core.dto.output.AccountReadDto;
import org.springframework.http.ResponseEntity;

public interface AccountController {
    ResponseEntity<AccountReadDto> findByPhoneNumber(String phone);

    ResponseEntity<Void> update(Long id, AccountUpdateDto dto);

    ResponseEntity<Void> delete(Long id);
}
