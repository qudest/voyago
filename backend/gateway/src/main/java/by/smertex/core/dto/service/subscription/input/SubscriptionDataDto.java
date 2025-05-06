package by.smertex.core.dto.service.subscription.input;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Сущность подписки")
public record SubscriptionDataDto(
        @Schema(description = "Номер телефона пользователя", example = "78005553535", minLength = 11, maxLength = 11)
        String phoneNumber
) {
}
