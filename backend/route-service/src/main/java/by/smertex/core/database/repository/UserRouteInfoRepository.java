package by.smertex.core.database.repository;

import by.smertex.core.database.model.UserRouteInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRouteInfoRepository extends JpaRepository<UserRouteInfo, Long> {

    List<UserRouteInfo> findByUserId(Long userId);

    boolean existsByRouteIdAndUserId(Long routeId, Long userId);

    UserRouteInfo findByRouteIdAndUserId(Long routeId, Long userId);
}
