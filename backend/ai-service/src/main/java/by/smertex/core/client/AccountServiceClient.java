package by.smertex.core.client;

import by.smertex.core.dto.output.AccountReadDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(value = "account-service")
public interface AccountServiceClient {
    @GetMapping("/api/account/{phone}")
    AccountReadDto findAccountByPhoneNumber(@PathVariable String phone);
}
