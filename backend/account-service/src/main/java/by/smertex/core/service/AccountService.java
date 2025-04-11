package by.smertex.core.service;

import by.smertex.core.dto.input.AccountUpdateDto;
import by.smertex.core.dto.output.AccountReadDto;

public interface AccountService {
    AccountReadDto findByPhoneNumber(String phoneNumber);

    AccountReadDto create(String phoneNumber);

    void update(Long id, AccountUpdateDto dto);

    void delete(Long id);
}
