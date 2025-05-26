package by.smertex.core.database.repository;

import by.smertex.core.database.model.Route;
import by.smertex.core.dto.input.RouteFilterDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {
    List<Route> findByName(String name);

    @Query("""
                SELECT r
                FROM Route r
                WHERE (:#{#dto.name} IS NULL OR LOWER(r.name) LIKE CONCAT('%', LOWER(:#{#dto.name}), '%'))
                  AND (:#{#dto.tags} IS NULL OR EXISTS (
                        SELECT t FROM r.tags t WHERE t IN :#{#dto.tags}
                  ))
                  AND (:#{#dto.origin} IS NULL OR r.routePoints.origin = :#{#dto.origin})
                  AND (:#{#dto.waypoints} IS NULL OR EXISTS (
                        SELECT t FROM r.routePoints.waypoints t WHERE t IN :#{#dto.waypoints}
                  ))
                  AND (:#{#dto.destination} IS NULL OR r.routePoints.destination = :#{#dto.destination})
                  AND (:#{#dto.distanceFrom} IS NULL OR r.distance >= :#{#dto.distanceFrom})
                  AND (:#{#dto.distanceTo} IS NULL OR r.distance <= :#{#dto.distanceTo})
                  AND (:#{#dto.durationFrom} IS NULL OR r.duration >= :#{#dto.durationFrom})
                  AND (:#{#dto.durationTo} IS NULL OR r.duration <= :#{#dto.durationTo})
            """)
    Slice<Route> findAllByFilter(RouteFilterDto dto, Pageable pageable);
}
