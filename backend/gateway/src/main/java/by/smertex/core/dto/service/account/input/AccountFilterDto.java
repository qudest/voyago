package by.smertex.core.dto.service.account.input;

import by.smertex.core.dto.service.account.Role;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Сущность для поиска пользователей с фильтрацией")
public record AccountFilterDto(
        @Schema(description = "Телефон пользователя, фильтрация 1 к 1")
        String phoneNumber,
        @Schema(description = "Имя пользователя, поиск по совпадению первых букв в имени")
        String name,
        @Schema(description = "Роль")
        Role role,
        @Schema(description = "Премиум")
        Boolean premium,
        @Schema(description = "Страна")
        String country,
        @Schema(description = "Город")
        String city,
        @Schema(description = "Количество полученных записей")
        Integer size,
        @Schema(description = "Страница с записями")
        Integer page) {
}
