package by.smertex;

import by.smertex.core.AbstractTest;
import by.smertex.core.database.model.impl.PhoneCode;
import by.smertex.core.database.repository.PhoneCodeRepository;
import by.smertex.core.dto.event.PhoneNotificationEvent;
import by.smertex.core.dto.input.PhoneCodeDto;
import by.smertex.core.exception.InvalidCodeException;
import by.smertex.core.service.PhoneCodeService;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.autoconfigure.kafka.KafkaAutoConfiguration;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.core.KafkaTemplate;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@Testcontainers
@EnableAutoConfiguration(exclude = KafkaAutoConfiguration.class)
@ImportAutoConfiguration(PhoneCodeServiceTest.KafkaMockConfiguration.class)
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

    @TestConfiguration
    static class KafkaMockConfiguration{
        @Bean
        KafkaTemplate<String, PhoneNotificationEvent> kafkaTemplate(){
            return Mockito.mock(KafkaTemplate.class);
        }
    }

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
    @DisplayName("Test save entity")
    void testSaveEntity() {
        String phone = "89005553535";
        int code = 654321;

        PhoneCode savePhoneCode = PhoneCode.builder()
                .phoneNumber(phone)
                .code(code)
                .build();
        phoneCodeService.save(savePhoneCode);

        phoneCodeRepository.findById(phone)
                .ifPresentOrElse(
                        entity -> {
                            Assertions.assertEquals(phone, entity.getPhoneNumber());
                            Assertions.assertEquals(code, entity.getCode());
                        },
                        () -> Assertions.fail("Entity not found")
                );
    }
}
