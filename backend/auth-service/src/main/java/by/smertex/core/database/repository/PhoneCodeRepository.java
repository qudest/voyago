package by.smertex.core.database.repository;

import by.smertex.core.database.model.impl.PhoneCode;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhoneCodeRepository extends CrudRepository<PhoneCode, String> {
}
