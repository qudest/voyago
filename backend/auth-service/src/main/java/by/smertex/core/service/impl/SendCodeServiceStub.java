package by.smertex.core.service.impl;

import by.smertex.core.database.model.impl.PhoneCode;
import by.smertex.core.database.repository.PhoneCodeRepository;
import by.smertex.core.dto.input.PhoneDto;
import by.smertex.core.service.SendCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@Primary
@RequiredArgsConstructor
public class SendCodeServiceStub implements SendCodeService {

    private final PhoneCodeRepository phoneCodeRepository;

    private final Random random;

    public void send(PhoneDto phoneDto) {
        int code = 100000 + random.nextInt(900000);
        System.out.println(code);
        phoneCodeRepository.save(
                PhoneCode.builder()
                        .phoneNumber(phoneDto.phoneNumber())
                        .code(code)
                        .ttl(5L)
                        .build()
        );
    }

    @Configuration
    static class RandomConfiguration {
        @Bean
        Random random() {
            return new Random();
        }
    }
}
