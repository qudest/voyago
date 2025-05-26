package by.smertex.core.service;

import by.smertex.core.dto.input.AccountFilterDto;
import by.smertex.core.dto.input.AccountUpdateDto;
import by.smertex.core.dto.output.AccountReadDto;
import by.smertex.core.dto.output.PageResponse;
import org.springframework.data.domain.Pageable;

public interface AccountService {
    PageResponse<AccountReadDto> findAllByFilter(AccountFilterDto filter, Pageable pageable);

    AccountReadDto findByPhoneNumber(String phoneNumber);

    AccountReadDto create(String phoneNumber);

    void update(Long id, AccountUpdateDto dto);

    void delete(Long id);
}
