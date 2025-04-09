package by.smertex.core.service.impl;

import by.smertex.core.database.model.impl.Account;
import by.smertex.core.database.model.impl.Preference;
import by.smertex.core.dto.input.AccountUpdateDto;
import by.smertex.core.dto.output.AccountReadDto;
import by.smertex.core.mapper.Mapper;
import by.smertex.core.service.AccountService;
import by.smertex.core.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService, SubscriptionService {

    private final Mapper<Account, AccountReadDto> accountToReadDtoMapper;

    private final Mapper<AccountUpdateDto, Account> updateDtoToAccountMapper;

    @Lazy
    private AccountService accountService;

    @Override
    public AccountReadDto findByPhoneNumber(String phoneNumber) {
        return null;
    }

    @Override
    public AccountReadDto create(String phoneNumber) {
        return null;
    }

    @Override
    public void update(AccountUpdateDto dto) {

    }

    @Override
    public void updatePreferences(Long id, List<Preference> preferences) {

    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public void buyPremium(Long id) {

    }
}
