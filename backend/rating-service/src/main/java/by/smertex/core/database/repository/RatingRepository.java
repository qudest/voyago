package by.smertex.core.database.repository;

import by.smertex.core.database.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

    List<Rating> findAllByUserId(Long userId);

    Optional<Rating> findByRouteIdAndUserId(Long routeId, Long userId);
}
