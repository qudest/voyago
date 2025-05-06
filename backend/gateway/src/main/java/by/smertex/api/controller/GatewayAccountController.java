package by.smertex.api.controller;

import by.smertex.core.dto.service.account.input.AccountUpdateDto;
import by.smertex.core.dto.service.account.output.AccountReadDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "Контроллер аккаунтов", description = "Контроллер для работы с аккаунтами")
public interface GatewayAccountController {

    @Operation(
            summary = "Получить аккаунт по номеру телефона",
            description = "Отправляет запрос на получение аккаунта, в случае его отсутствия - делает запись в базе данных"
    )
    ResponseEntity<AccountReadDto> findAccountByPhoneNumber(
            @Parameter(description = "Номер телефона", example = "78005553535", required = true)
            String phone
    );

    @Operation(
            summary = "Обновить данные аккаунта",
            description = "Обновляет данные пользователя, исходя из его id"
    )
    ResponseEntity<Void> update(
            @Parameter(description = "Пользовательский id", required = true)
            Long id,
            @Parameter(description = "Данные", required = true)
            AccountUpdateDto dto
    );

    @Operation(
            summary = "Удалить аккаунт",
            description = "Удаляет аккаунт, исходя из его id"
    )
    ResponseEntity<Void> delete(
            @Parameter(description = "Пользовательский id", required = true)
            Long id
    );
}
