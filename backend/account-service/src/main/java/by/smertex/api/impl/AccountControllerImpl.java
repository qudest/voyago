package by.smertex.api.impl;

import by.smertex.api.AccountController;
import by.smertex.core.dto.input.AccountUpdateDto;
import by.smertex.core.dto.output.AccountReadDto;
import by.smertex.core.service.AccountService;
import by.smertex.core.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountControllerImpl implements AccountController {

    private final AccountService accountService;

    private final SubscriptionService subscriptionService;

    @GetMapping
    public ResponseEntity<AccountReadDto> findByPhoneNumber(String phoneNumber) {
        return ResponseEntity.ok(
                accountService.findByPhoneNumber(phoneNumber)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id,
                                       @RequestBody AccountUpdateDto dto) {
        accountService.update(id, dto);
        return ResponseEntity.noContent()
                .build();
    }

    @PutMapping("/premium/{id}")
    public ResponseEntity<Void> buyPremium(@PathVariable Long id) {
        subscriptionService.buyPremium(id);
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
