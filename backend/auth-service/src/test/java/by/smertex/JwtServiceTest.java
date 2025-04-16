package by.smertex;

import by.smertex.core.AbstractTest;
import by.smertex.core.database.model.impl.Token;
import by.smertex.core.database.repository.TokenRepository;
import by.smertex.core.service.JwtService;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.kafka.KafkaAutoConfiguration;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@Testcontainers
@EnableAutoConfiguration(exclude = KafkaAutoConfiguration.class)
@ExtendWith(MockitoExtension.class)
public class JwtServiceTest extends AbstractTest {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private TokenRepository tokenRepository;

    @Container
    @ServiceConnection
    static GenericContainer<?> container =
            new GenericContainer<>("redis:latest").withExposedPorts(6379);

    @BeforeAll
    static void setup(){
        container.start();
    }

    @BeforeEach
    void init(){
        tokenRepository.save(
                Token.builder()
                        .phoneNumber("88005553535")
                        .accessToken("this-jwt-access-token")
                        .refreshToken("this-jwt-refresh-token")
                        .build()
        );
    }

    @AfterEach
    void destroy(){
        tokenRepository.deleteAll();
    }

    @Test
    @DisplayName("Test generate token method for handle exception")
    void testGenerateTokenError() {
    }


}
