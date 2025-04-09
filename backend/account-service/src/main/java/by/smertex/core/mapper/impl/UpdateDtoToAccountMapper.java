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
                .phoneNumber(from.phoneNumber())
                .country(from.country())
                .city(from.city())
                .creditCard(from.creditCard())
                .build();
    }

    @Override
    public Account map(AccountUpdateDto from, Account to) {
        to.setPhoneNumber(from.phoneNumber());
        to.setCountry(from.country());
        to.setCity(from.city());
        to.setCreditCard(from.creditCard());
        return to;
    }
}
