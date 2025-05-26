package by.smertex.api;

import by.smertex.core.dto.input.AccountFilterDto;
import by.smertex.core.dto.input.AccountUpdateDto;
import by.smertex.core.dto.output.AccountReadDto;
import by.smertex.core.dto.output.PageResponse;
import by.smertex.core.util.Patterns;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface AccountController {
    PageResponse<AccountReadDto> findAllByFilter(AccountFilterDto filter, Pageable pageable);

    ResponseEntity<AccountReadDto> findByPhoneNumber(@Pattern(regexp = Patterns.PHONE_NUMBER) String phone);

    ResponseEntity<Void> update(Long id, @Valid AccountUpdateDto dto);

    ResponseEntity<Void> delete(Long id);
}
