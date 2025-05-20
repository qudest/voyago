package by.smertex.core.database.repository;

import by.smertex.core.database.model.impl.Account;

import by.smertex.core.dto.input.AccountFilterDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    @Query("""
            select a
            from Account a
            where (:#{#dto.phoneNumber} is null or a.phoneNumber = :#{#dto.phoneNumber})
              and (:#{#dto.name} is null or lower(a.name) like concat(lower(:#{#dto.name}), '%'))
              and (:#{#dto.role} is null or a.role = :#{#dto.role})
              and (:#{#dto.premium} is null or a.premium = :#{#dto.premium})
              and (:#{#dto.country} is null or a.country = :#{#dto.country})
              and (:#{#dto.city} is null or a.city = :#{#dto.city})
            """)
    Slice<Account> findAllByFilter(AccountFilterDto dto, Pageable pageable);

    Optional<Account> findByPhoneNumber(String phoneNumber);

}
