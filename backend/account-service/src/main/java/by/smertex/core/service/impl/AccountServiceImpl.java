package by.smertex.core.service.impl;

import by.smertex.core.database.model.impl.Account;
import by.smertex.core.database.model.impl.Role;
import by.smertex.core.database.model.impl.Status;
import by.smertex.core.database.repository.AccountRepository;
import by.smertex.core.dto.input.AccountFilterDto;
import by.smertex.core.dto.input.AccountUpdateDto;
import by.smertex.core.dto.output.AccountReadDto;
import by.smertex.core.dto.output.PageResponse;
import by.smertex.core.exception.impl.CrudException;
import by.smertex.core.mapper.Mapper;
import by.smertex.core.service.AccountService;
import by.smertex.core.service.SubscriptionService;
import by.smertex.core.util.generator.Generator;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AccountServiceImpl implements AccountService, SubscriptionService {

    private final AccountRepository accountRepository;

    private final Mapper<Account, AccountReadDto> accountToReadDtoMapper;

    private final Mapper<AccountUpdateDto, Account> updateDtoToAccountMapper;

    private final Generator<String> nameGenerator;

    private AccountService accountService;

    public PageResponse<AccountReadDto> findAllByFilter(AccountFilterDto filter, Pageable pageable) {
        Slice<AccountReadDto> slice = accountRepository.findAllByFilter(filter, pageable)
                .map(accountToReadDtoMapper::map);
        return PageResponse.toPage(slice);
    }

    public AccountReadDto findByPhoneNumber(String phoneNumber) {
        return accountRepository
                .findByPhoneNumber(phoneNumber)
                .map(accountToReadDtoMapper::map)
                .orElseGet(() -> accountService.create(phoneNumber));
    }

    public AccountReadDto create(String phoneNumber) {
        return Optional.of(accountRepository.save(
                        Account.builder()
                                .phoneNumber(phoneNumber)
                                .name(nameGenerator.generate())
                                .role(Role.ROLE_USER)
                                .premium(false)
                                .status(Status.ACTIVE)
                                .build())
                )
                .map(accountToReadDtoMapper::map)
                .orElseThrow(() -> new CrudException("Create account exception", HttpStatus.BAD_REQUEST.value()));
    }

    public void update(Long id, AccountUpdateDto dto) {
        accountRepository.saveAndFlush(
                accountRepository.findById(id)
                        .map(account -> updateDtoToAccountMapper.map(dto, account))
                        .orElseThrow(() -> new CrudException("Update account exception, entity not found", HttpStatus.NOT_FOUND.value()))
        );
    }

    public void delete(Long id) {
        accountRepository.findById(id)
                .map(account -> {
                    accountRepository.delete(account);
                    return account;
                })
                .orElseThrow(() -> new CrudException("Delete account exception, entity not found", HttpStatus.NOT_FOUND.value()));
    }

    public void buyPremium(String phoneNumber, LocalDateTime endDate) {
        accountRepository.saveAndFlush(
                accountRepository.findByPhoneNumber(phoneNumber)
                        .map(account -> {
                            account.setPremium(true);
                            account.setEndDate(endDate);
                            return account;
                        })
                        .orElseThrow(() -> new CrudException("Buy premium exception", HttpStatus.BAD_REQUEST.value()))
        );
    }

    @Autowired
    @Lazy
    private void setAccountService(AccountService accountService) {
        this.accountService = accountService;
    }
}
