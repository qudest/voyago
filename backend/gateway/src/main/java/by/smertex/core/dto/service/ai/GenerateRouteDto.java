package by.smertex.core.dto.service.ai;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Schema(description = "DTO для генерации маршрута")
public record GenerateRouteDto(
        @Schema(description = "Номер телефона", example = "78005553535") @NotBlank @Pattern(regexp =  "^[0-9]{11}$") String phone,
        @Schema(description = "Страна", example = "Россия") @NotBlank String country,
        @Schema(description = "Город", example = "Москва") @NotBlank String city) {
}