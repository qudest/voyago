package by.smertex.core.service.impl;

import by.smertex.core.database.model.UserRouteInfo;
import by.smertex.core.database.repository.UserRouteInfoRepository;
import by.smertex.core.service.UserRouteInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserRouteInfoServiceImpl implements UserRouteInfoService {

    private final UserRouteInfoRepository userRouteInfoRepository;

    @Override
    public List<UserRouteInfo> findAllByUserId(Long userId) {
        return userRouteInfoRepository.findByUserId(userId);
    }

    @Override
    @Transactional
    public void addToFavorites(Long routeId, Long userId) {
        if (userRouteInfoRepository.existsByRouteIdAndUserId(routeId, userId)) {
            UserRouteInfo byRouteIdAndUserId = userRouteInfoRepository.findByRouteIdAndUserId(routeId, userId);
            byRouteIdAndUserId.setIsFavorite(true);
            userRouteInfoRepository.save(byRouteIdAndUserId);
        } else {
            UserRouteInfo userRouteInfo = UserRouteInfo.builder()
                    .routeId(routeId)
                    .userId(userId)
                    .isFavorite(true)
                    .build();
            userRouteInfoRepository.save(userRouteInfo);
        }
    }

    @Override
    @Transactional
    public void removeFromFavorites(Long routeId, Long userId) {
        if (!userRouteInfoRepository.existsByRouteIdAndUserId(routeId, userId)) {
            return;
        }
        UserRouteInfo userRouteInfo = userRouteInfoRepository.findByRouteIdAndUserId(routeId, userId);
        userRouteInfo.setIsFavorite(false);
        userRouteInfoRepository.save(userRouteInfo);
    }

    @Override
    @Transactional
    public void addToPassed(Long routeId, Long userId) {
        if (userRouteInfoRepository.existsByRouteIdAndUserId(routeId, userId)) {
            UserRouteInfo byRouteIdAndUserId = userRouteInfoRepository.findByRouteIdAndUserId(routeId, userId);
            byRouteIdAndUserId.setIsPassed(true);
            userRouteInfoRepository.save(byRouteIdAndUserId);
        } else {
            UserRouteInfo userRouteInfo = UserRouteInfo.builder()
                    .routeId(routeId)
                    .userId(userId)
                    .isFavorite(true)
                    .build();
            userRouteInfoRepository.save(userRouteInfo);
        }
    }

    @Override
    @Transactional
    public void removeFromPassed(Long routeId, Long userId) {
        if (!userRouteInfoRepository.existsByRouteIdAndUserId(routeId, userId)) {
            return;
        }
        UserRouteInfo userRouteInfo = userRouteInfoRepository.findByRouteIdAndUserId(routeId, userId);
        userRouteInfo.setIsPassed(false);
        userRouteInfoRepository.save(userRouteInfo);
    }
}
