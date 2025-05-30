package by.smertex.api.controller.impl;

import by.smertex.api.controller.GatewayAccountController;
import by.smertex.core.client.AccountServiceClient;
import by.smertex.core.dto.service.account.input.AccountFilterDto;
import by.smertex.core.dto.service.account.input.AccountUpdateDto;
import by.smertex.core.dto.service.account.output.AccountReadDto;
import by.smertex.core.dto.service.account.output.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class GatewayAccountControllerImpl implements GatewayAccountController {

    private final AccountServiceClient accountServiceClient;

    @GetMapping
    public PageResponse<AccountReadDto> findAllByFilter(AccountFilterDto filter) {
        return accountServiceClient.findAllByFilter(
                filter.phoneNumber(),
                filter.name(),
                filter.role(),
                filter.premium(),
                filter.country(),
                filter.city(),
                filter.size(),
                filter.page()
        );
    }

    @GetMapping("/{phone}")
    public ResponseEntity<AccountReadDto> findAccountByPhoneNumber(@PathVariable String phone){
        return ResponseEntity.ok(
                accountServiceClient.findAccountByPhoneNumber(phone)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id,
                @RequestBody AccountUpdateDto dto){
        return ResponseEntity.ok(
                accountServiceClient.update(id, dto)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return ResponseEntity.ok(
                accountServiceClient.delete(id)
        );
    }
}
