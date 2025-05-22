package by.smertex.core.dto.service.account.output;

import by.smertex.core.dto.service.account.Preference;
import by.smertex.core.dto.service.account.Role;
import by.smertex.core.dto.service.account.Status;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;
import java.util.List;

@Schema(name = "Сущность пользователя")
public record AccountReadDto(
        @Schema(description = "Пользовательский id")
        Long id,

        @Schema(description = "Номер телефона пользователя", example = "78005553535", minLength = 11, maxLength = 11)
        String phoneNumber,

        @Schema(description = "Имя пользователя")
        String name,

        @Schema(description = "Роль пользователя")
        Role role,

        @Schema(description = "Статус аккаунта пользователя")
        Status status,

        @Schema(description = "Статус подписки пользователя")
        Boolean premium,

        @Schema(description = "Дата окончания подписки пользователя")
        LocalDateTime endDate,

        @Schema(description = "Страна пользователя")
        String country,

        @Schema(description = "Город пользователя")
        String city,

        @Schema(description = "Предпочтения пользователя")
        List<Preference> preferences,

        @Schema(description = "Кредитная карта пользователя", example = "1234567891234567", minLength = 16, maxLength = 16)
        String creditCard
) {
}
