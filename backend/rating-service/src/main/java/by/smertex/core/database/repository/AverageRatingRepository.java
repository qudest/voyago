package by.smertex.core.database.repository;

import by.smertex.core.database.model.AverageRating;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AverageRatingRepository extends CrudRepository<AverageRating, String> {
}
