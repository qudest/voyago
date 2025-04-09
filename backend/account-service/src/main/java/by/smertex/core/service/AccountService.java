package by.smertex.core.service;

import by.smertex.core.database.model.impl.Preference;
import by.smertex.core.dto.input.AccountUpdateDto;
import by.smertex.core.dto.output.AccountReadDto;

import java.util.List;

public interface AccountService {
    AccountReadDto findByPhoneNumber(String phoneNumber);

    AccountReadDto create(String phoneNumber);

    void update(AccountUpdateDto dto);

    void updatePreferences(Long id, List<Preference> preferences);

    void delete(Long id);
}
