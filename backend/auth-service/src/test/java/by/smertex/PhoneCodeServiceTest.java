package by.smertex;

import by.smertex.core.AbstractTest;
import by.smertex.core.database.model.impl.PhoneCode;
import by.smertex.core.database.repository.PhoneCodeRepository;
import by.smertex.core.dto.input.PhoneCodeDto;
import by.smertex.core.exception.InvalidCodeException;
import by.smertex.core.service.PhoneCodeService;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.kafka.KafkaAutoConfiguration;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@Testcontainers
@EnableAutoConfiguration(exclude = KafkaAutoConfiguration.class)
public class PhoneCodeServiceTest extends AbstractTest {

    @Autowired
    private PhoneCodeService phoneCodeService;

    @Autowired
    private PhoneCodeRepository phoneCodeRepository;

    @Container
    @ServiceConnection
    static GenericContainer<?> redisContainer =
            new GenericContainer<>("redis:latest")
                    .withExposedPorts(6379);

    @BeforeAll
    static void setApp(){
        redisContainer.start();
    }

    @BeforeEach
    void init(){
        phoneCodeRepository.save(
                PhoneCode.builder()
                        .phoneNumber("88005553535")
                        .code(123456)
                        .ttl(3L)
                        .build()
        );
    }

    @AfterEach
    void destroy(){
        phoneCodeRepository.deleteAll();
    }

    @Test
    @DisplayName("Test verify code")
    void testVerifyCode(){
        PhoneCodeDto dto = PhoneCodeDto.builder()
                .phoneNumber("88005553535")
                .code(123456)
                .build();

        phoneCodeService.verifyCode(dto);
    }

    @Test
    @DisplayName("Test throw verify code exception")
    void testThrowException() {
        PhoneCodeDto dto = PhoneCodeDto.builder()
                .phoneNumber("88005553535")
                .code(12345)
                .build();
        Assertions.assertThrows(
                InvalidCodeException.class,
                () -> phoneCodeService.verifyCode(dto)
        );
    }

    @Test
    @DisplayName("Test generate code")
    void testGenerateCode() {
        String phoneNumber = "89005553535";
        PhoneCode generatePhoneCode = phoneCodeService.generate(phoneNumber);

        phoneCodeRepository.findById(phoneNumber)
                .ifPresentOrElse(
                        entity -> {
                            Assertions.assertEquals(phoneNumber, entity.getPhoneNumber());
                            Assertions.assertEquals(generatePhoneCode.getPhoneNumber(), entity.getPhoneNumber());
                            Assertions.assertEquals(generatePhoneCode.getCode(), entity.getCode());
                        },
                        () -> Assertions.fail("Phone code generation failed")
                );
    }


}
