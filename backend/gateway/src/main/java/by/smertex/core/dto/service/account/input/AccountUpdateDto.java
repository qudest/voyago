package by.smertex.core.dto.service.account.input;

import by.smertex.core.dto.service.account.Preference;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(description = "Сущность для обновления данных пользователя")
public record AccountUpdateDto(
        @Schema(description = "Имя пользователя", example = "Username", minLength = 6, maxLength = 24)
        String name,

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
