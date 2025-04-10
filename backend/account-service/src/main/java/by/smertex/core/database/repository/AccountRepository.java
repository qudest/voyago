package by.smertex.core.database.repository;

import by.smertex.core.database.model.impl.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByPhoneNumber(String phoneNumber);

}
