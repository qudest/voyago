package by.smertex.api.controller;

import by.smertex.core.dto.service.subscription.input.SubscriptionDataDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "Контроллер подписки", description = "Контроллер для работы с подпиской")
public interface GatewaySubscriptionController {

    @Operation(
            summary = "Оформление подписки",
            description = "Изменяет состояние подписки у аккаунта пользователя"
    )
    ResponseEntity<Void> subscribe(
            @Parameter(description = "Данные для оформления подписки", required = true)
            SubscriptionDataDto subscriptionDataDto
    );
}
