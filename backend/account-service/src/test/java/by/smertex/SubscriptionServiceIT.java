package by.smertex;

import by.smertex.core.AbstractTest;
import by.smertex.core.database.model.impl.Account;
import by.smertex.core.database.model.impl.Role;
import by.smertex.core.database.model.impl.Status;
import by.smertex.core.database.repository.AccountRepository;
import by.smertex.core.service.SubscriptionService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.kafka.KafkaAutoConfiguration;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.transaction.annotation.Transactional;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.time.LocalDateTime;

@Testcontainers
@EnableAutoConfiguration(exclude = KafkaAutoConfiguration.class)
@Transactional
public class SubscriptionServiceIT extends AbstractTest {

    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private AccountRepository accountRepository;

    @Container
    @ServiceConnection
    static PostgreSQLContainer<?> container =
            new PostgreSQLContainer<>("postgres:latest");

    @BeforeAll
    static void setUp() {
        container.start();
    }

    @BeforeEach
    void init() {
        accountRepository.save(
                Account.builder()
                        .name("profile123456789")
                        .phoneNumber("88005553535")
                        .city("Voronezh")
                        .role(Role.ROLE_USER)
                        .premium(false)
                        .status(Status.ACTIVE)
                        .build()
        );
    }

    @AfterEach
    void destroy() {
        accountRepository.deleteAll();
    }

    @Test
    @DisplayName("Test payment premium")
    void testPaymentPremium() {
        String phoneNumber = "88005553535";
        LocalDateTime now = LocalDateTime.now();

        subscriptionService.buyPremium(phoneNumber, now);

        accountRepository.findByPhoneNumber(phoneNumber)
                .ifPresentOrElse(
                        account -> {
                            Assertions.assertTrue(account.getPremium());
                            Assertions.assertEquals(account.getEndDate(), now);
                        },
                        Assertions::fail
                );
    }

}
