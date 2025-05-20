package by.smertex.core.service;

import by.smertex.core.database.model.UserRouteInfo;

import java.util.List;

public interface UserRouteInfoService {

    List<UserRouteInfo> findAllByUserId(Long userId);

    void addToFavorites(Long routeId, Long userId);

    void removeFromFavorites(Long routeId, Long userId);

    void addToPassed(Long routeId, Long userId);

    void removeFromPassed(Long routeId, Long userId);
}
