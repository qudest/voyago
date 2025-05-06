package by.smertex;

import by.smertex.core.AbstractTest;
import by.smertex.core.database.model.impl.Account;
import by.smertex.core.database.model.impl.Preference;
import by.smertex.core.database.model.impl.Role;
import by.smertex.core.database.model.impl.Status;
import by.smertex.core.database.repository.AccountRepository;
import by.smertex.core.dto.input.AccountUpdateDto;
import by.smertex.core.dto.output.AccountReadDto;
import by.smertex.core.exception.impl.CrudException;
import by.smertex.core.service.AccountService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.kafka.KafkaAutoConfiguration;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.transaction.annotation.Transactional;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.ArrayList;
import java.util.List;

@Testcontainers
@EnableAutoConfiguration(exclude = KafkaAutoConfiguration.class)
@Transactional
public class AccountServiceIT extends AbstractTest {

    @Autowired
    private AccountService accountService;

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
    @DisplayName("Test find account by phone number")
    void testFindByPhoneNumber() {
        String phoneNumber = "88005553535";

        AccountReadDto accountReadDto = accountService.findByPhoneNumber(phoneNumber);

        Assertions.assertEquals(accountReadDto.phoneNumber(), phoneNumber);
        Assertions.assertEquals(accountReadDto.role(), Role.ROLE_USER);
        Assertions.assertEquals(accountReadDto.premium(), false);
        Assertions.assertEquals(accountReadDto.status(), Status.ACTIVE);
    }

    @Test
    @DisplayName("Test create entity")
    void testCreateEntity() {
        String phoneNumber = "12345678912";

        accountService.create(phoneNumber);
        Assertions.assertTrue(
                accountRepository.findByPhoneNumber(phoneNumber).isPresent()
        );
    }

    @Test
    @DisplayName("Test find account by phone number if account does not exist")
    void testFindByPhoneNumberIfAccountDoesNotExist() {
        String phoneNumber = "12345678912";

        AccountReadDto accountReadDto = accountService.findByPhoneNumber(phoneNumber);
        Assertions.assertEquals(accountReadDto.phoneNumber(), phoneNumber);
    }

    @Test
    @DisplayName("Test delete account")
    void testDeleteAccount() {
        Account account = Account.builder()
                .name("profile123456888")
                .phoneNumber("12345678912")
                .city("Voronezh")
                .role(Role.ROLE_USER)
                .premium(false)
                .status(Status.ACTIVE)
                .build();
        accountRepository.save(account);

        accountService.delete(account.getId());

        Assertions.assertTrue(
                accountRepository.findById(account.getId()).isEmpty()
        );
    }

    @Test
    @DisplayName("Test update account")
    void testUpdateAccount() {
        Account account = Account.builder()
                .name("profile123456888")
                .phoneNumber("12345678912")
                .city("Voronezh")
                .role(Role.ROLE_USER)
                .premium(false)
                .status(Status.ACTIVE)
                .build();
        accountRepository.save(account);

        Assertions.assertTrue(account.getPreferences().isEmpty());

        List<Preference> preferences = new ArrayList<>();
        preferences.add(Preference.ARCHITECTURE);
        preferences.add(Preference.CAFE);
        preferences.add(Preference.BAR);

        AccountUpdateDto accountUpdateDto = AccountUpdateDto.builder()
                .country("Russia")
                .city("Moscow")
                .preferences(preferences)
                .creditCard("123456789123:123:12/33")
                .name("profile125456888")
                .build();

        accountService.update(account.getId(), accountUpdateDto);

        Assertions.assertEquals(accountUpdateDto.country(), account.getCountry());
        Assertions.assertEquals(accountUpdateDto.city(), account.getCity());
        Assertions.assertEquals(accountUpdateDto.preferences(), account.getPreferences());
        Assertions.assertEquals(accountUpdateDto.creditCard(), account.getCreditCard());
    }

    @Test
    @DisplayName("Test delete exception")
    void testDeleteException() {
        Assertions.assertThrows(CrudException.class, () -> accountService.delete(-1L));
    }

    @Test
    @DisplayName("Test update exception")
    void testUpdateException() {
        Assertions.assertThrows(
                CrudException.class,
                () -> accountService.update(-1L, AccountUpdateDto.builder()
                        .country("Russia")
                        .city("Moscow")
                        .preferences(new ArrayList<>())
                        .creditCard("123456789123:123:12/33")
                        .build())
        );
    }
}
