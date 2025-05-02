package by.smertex;

import by.smertex.core.AbstractTest;
import by.smertex.core.database.model.impl.Token;
import by.smertex.core.database.repository.TokenRepository;
import by.smertex.core.dto.input.AccountReadDto;
import by.smertex.core.dto.input.PhoneCodeDto;
import by.smertex.core.dto.input.RefreshTokenDto;
import by.smertex.core.dto.output.TokenDto;
import by.smertex.core.exception.InvalidCodeException;
import by.smertex.core.service.JwtService;
import by.smertex.core.service.PhoneCodeService;
import by.smertex.core.util.jwt.JwtUtil;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.kafka.KafkaAutoConfiguration;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.web.client.RestTemplate;
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

    @Autowired
    private JwtUtil<AccountReadDto> jwtAccessUtil;

    @Autowired
    private JwtUtil<String> jwtRefreshUtil;

    @MockitoBean
    private RestTemplate restTemplate;

    @MockitoBean
    private PhoneCodeService phoneCodeService;

    @Value("${path.account-service}")
    private String restTemplatePath;

    @Container
    @ServiceConnection
    static GenericContainer<?> redisContainer =
            new GenericContainer<>("redis:latest")
                    .withExposedPorts(6379);

    @BeforeAll
    static void setApp() {
        redisContainer.start();
    }

    @BeforeEach
    void init() {
        Token token = Token.builder()
                .phoneNumber("88005553535")
                .accessToken("this-jwt-access-token")
                .refreshToken("this-jwt-refresh-token")
                .build();
        PhoneCodeDto phoneCodeDto =
                new PhoneCodeDto("88005553535", 123456);
        AccountReadDto returnedAccount = AccountReadDto.builder()
                .id(1L)
                .phoneNumber(phoneCodeDto.phoneNumber())
                .name("Test")
                .city("Voronezh")
                .country("Russia")
                .role("ROLE_USER")
                .endDate(null)
                .premium(false)
                .creditCard(null)
                .build();

        tokenRepository.save(token);

        Mockito.doNothing()
                .when(phoneCodeService)
                .verifyCode(phoneCodeDto);
        Mockito
                .when(restTemplate.getForObject(restTemplatePath, AccountReadDto.class, phoneCodeDto.phoneNumber()))
                .thenReturn(returnedAccount);
    }

    @AfterEach
    void destroy() {
        tokenRepository.deleteAll();
    }

//    @Test
//    @DisplayName("Test generate token")
//    void testGenerateToken() {
//        PhoneCodeDto phoneCodeDto = new PhoneCodeDto("88005553535", 123456);
//
//        TokenDto tokenDto = jwtService.generateToken(phoneCodeDto);
//        Assertions.assertNotNull(tokenDto);
//        Assertions.assertEquals(
//                jwtAccessUtil.getUsername(tokenDto.accessToken()), phoneCodeDto.phoneNumber()
//        );
//        Assertions.assertEquals(
//                jwtRefreshUtil.getUsername(tokenDto.refreshToken()), phoneCodeDto.phoneNumber()
//        );
//        Assertions.assertTrue(
//                jwtAccessUtil.validateToken(
//                        tokenDto.accessToken()
//                )
//
//        );
//        Assertions.assertTrue(
//                jwtRefreshUtil.validateToken(
//                        tokenDto.refreshToken()
//                )
//        );
//    }

    @Test
    @DisplayName("Test generate token exception validation")
    void testGenerateTokenExceptionValidation() {
        PhoneCodeDto phoneCodeDto = new PhoneCodeDto("88005553535", -1);
        Mockito.doThrow(InvalidCodeException.class)
                .when(phoneCodeService)
                .verifyCode(phoneCodeDto);

        Assertions.assertThrows(
                InvalidCodeException.class,
                () -> jwtService.generateToken(phoneCodeDto)
        );
    }

//    @Test
//    @DisplayName("Test update token")
//    void testUpdateToken() throws InterruptedException {
//        String phoneNumber = "88006663535";
//        AccountReadDto account = AccountReadDto.builder()
//                .id(3L)
//                .phoneNumber(phoneNumber)
//                .name("TestUpdate")
//                .city("New York")
//                .country("USA")
//                .role("ROLE_USER")
//                .endDate(null)
//                .premium(false)
//                .creditCard(null)
//                .build();
//        String accessToken = jwtAccessUtil.generateToken(account);
//        String refreshToken = jwtRefreshUtil.generateToken(phoneNumber);
//        tokenRepository.save(
//                Token.builder()
//                        .phoneNumber(phoneNumber)
//                        .accessToken(accessToken)
//                        .refreshToken(refreshToken)
//                        .build()
//        );
//        RefreshTokenDto refreshTokenDto = RefreshTokenDto.builder()
//                .refreshToken(refreshToken)
//                .build();
//
//        Mockito
//                .when(restTemplate.getForObject(restTemplatePath, AccountReadDto.class, phoneNumber))
//                .thenReturn(account);
//
//        tokenRepository.findById(phoneNumber).ifPresentOrElse(
//                token -> {
//                    Assertions.assertEquals(token.getAccessToken(), accessToken);
//                    Assertions.assertEquals(token.getRefreshToken(), refreshToken);
//                },
//                () -> Assertions.fail("Token not found")
//        );
//
//        Thread.sleep(1000);
//        jwtService.updateToken(refreshTokenDto);
//
//        tokenRepository.findById(phoneNumber).ifPresentOrElse(
//                token -> {
//                    Assertions.assertNotEquals(token.getAccessToken(), accessToken);
//                    Assertions.assertEquals(token.getRefreshToken(), refreshToken);
//                },
//                () -> Assertions.fail("Token not found")
//        );
//    }
//
//    @Test
//    @DisplayName("Test delete token")
//    void testDeleteToken() {
//        String phoneNumber = "89007773535";
//        Token token = Token.builder()
//                .phoneNumber(phoneNumber)
//                .accessToken("access-token")
//                .refreshToken("refresh-token")
//                .build();
//        tokenRepository.save(token);
//        jwtService.removeToken(phoneNumber);
//
//        Assertions.assertTrue(
//                tokenRepository.findById(phoneNumber).isEmpty()
//        );
//    }
}
