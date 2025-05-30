package by.smertex.api.impl;

import by.smertex.api.AccountController;
import by.smertex.core.dto.input.AccountFilterDto;
import by.smertex.core.dto.input.AccountUpdateDto;
import by.smertex.core.dto.output.AccountReadDto;
import by.smertex.core.dto.output.PageResponse;
import by.smertex.core.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountControllerImpl implements AccountController {

    private final AccountService accountService;

    @GetMapping
    public PageResponse<AccountReadDto> findAllByFilter(AccountFilterDto filter, Pageable pageable) {
        return accountService.findAllByFilter(filter, pageable);
    }

    @GetMapping("/{phone}")
    public ResponseEntity<AccountReadDto> findByPhoneNumber(@PathVariable String phone) {
        return ResponseEntity.ok(
                accountService.findByPhoneNumber(phone)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id,
                                       @RequestBody AccountUpdateDto dto) {
        accountService.update(id, dto);
        return ResponseEntity.noContent()
                .build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        accountService.delete(id);
        return ResponseEntity.noContent()
                .build();
    }
}
