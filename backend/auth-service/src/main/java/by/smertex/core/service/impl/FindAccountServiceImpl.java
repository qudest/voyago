package by.smertex.core.service.impl;

import by.smertex.core.dto.input.AccountReadDto;
import by.smertex.core.service.FindAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class FindAccountServiceImpl implements FindAccountService {

    private final RestTemplate restTemplate;

    @Value("${path.account-service}")
    private String path;

    @Override
    public AccountReadDto findAccountByPhoneNumber(String phoneNumber) {
        return restTemplate.getForObject(path, AccountReadDto.class, phoneNumber);
    }
}
