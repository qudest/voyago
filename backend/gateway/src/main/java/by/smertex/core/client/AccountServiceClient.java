package by.smertex.core.client;

import by.smertex.core.dto.service.account.input.AccountUpdateDto;
import by.smertex.core.dto.service.account.output.AccountReadDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(value = "account-service")
public interface AccountServiceClient {
    @GetMapping("/api/account/{phone}")
    AccountReadDto findAccountByPhoneNumber(@PathVariable String phone);

    @PutMapping("/api/account/{id}")
    Void update(@PathVariable Long id,
                @RequestBody AccountUpdateDto dto);

    @DeleteMapping("/api/account/{id}")
    Void delete(@PathVariable Long id);
}
