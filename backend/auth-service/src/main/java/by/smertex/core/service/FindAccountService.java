package by.smertex.core.service;

import by.smertex.core.dto.input.AccountReadDto;

public interface FindAccountService {
    AccountReadDto findAccountByPhoneNumber(String phoneNumber);
}
