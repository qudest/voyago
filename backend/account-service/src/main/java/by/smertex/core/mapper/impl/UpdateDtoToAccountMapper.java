package by.smertex.core.mapper.impl;

import by.smertex.core.database.model.impl.Account;
import by.smertex.core.dto.input.AccountUpdateDto;
import by.smertex.core.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class UpdateDtoToAccountMapper implements Mapper<AccountUpdateDto, Account> {
    @Override
    public Account map(AccountUpdateDto from) {
        return Account.builder()
                .name(from.name())
                .country(from.country())
                .city(from.city())
                .preferences(from.preferences())
                .creditCard(from.creditCard())
                .build();
    }

    @Override
    public Account map(AccountUpdateDto from, Account to) {
        to.setName(from.name());
        to.setCountry(from.country());
        to.setCity(from.city());
        to.setCreditCard(from.creditCard());
        to.setPreferences(from.preferences());
        return to;
    }
}
