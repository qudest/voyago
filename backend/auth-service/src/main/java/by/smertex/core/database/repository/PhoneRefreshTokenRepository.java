package by.smertex.core.database.repository;

import by.smertex.core.database.model.impl.PhoneRefreshToken;
import org.springframework.data.repository.CrudRepository;

public interface PhoneRefreshTokenRepository extends CrudRepository<PhoneRefreshToken, String> {
}
