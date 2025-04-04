package by.smertex.core.dto.input;

public record AccountUpdateDto(String phoneNumber,
                               String country,
                               String city,
                               String creditCard) {
}
