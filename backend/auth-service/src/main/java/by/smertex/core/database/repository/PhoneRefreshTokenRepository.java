package by.smertex.core.database.repository;

import by.smertex.core.database.model.impl.PhoneRefreshToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhoneRefreshTokenRepository extends CrudRepository<PhoneRefreshToken, String> {
}
