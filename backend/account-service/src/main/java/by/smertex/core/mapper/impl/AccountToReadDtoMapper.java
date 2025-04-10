package by.smertex.core.mapper.impl;

import by.smertex.core.database.model.impl.Account;
import by.smertex.core.dto.output.AccountReadDto;
import by.smertex.core.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class AccountToReadDtoMapper implements Mapper<Account, AccountReadDto> {
    @Override
    public AccountReadDto map(Account from) {
        return AccountReadDto.builder()
                .phoneNumber(from.getPhoneNumber())
                .name(from.getName())
                .role(from.getRole())
                .status(from.getStatus())
                .premium(from.getPremium())
                .preferences(from.getPreferences())
                .endDate(from.getEndDate())
                .country(from.getCountry())
                .city(from.getCity())
                .creditCard(from.getCreditCard())
                .build();
    }
}
