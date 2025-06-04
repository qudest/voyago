package by.smertex.core.service.impl;

import by.smertex.core.database.model.UserRouteInfo;
import by.smertex.core.database.repository.UserRouteInfoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserRouteInfoServiceImplTest {

    private UserRouteInfoRepository userRouteInfoRepository;
    private UserRouteInfoServiceImpl userRouteInfoService;

    private final Long userId = 1L;
    private final Long routeId = 2L;

    @BeforeEach
    void setUp() {
        userRouteInfoRepository = mock(UserRouteInfoRepository.class);
        userRouteInfoService = new UserRouteInfoServiceImpl(userRouteInfoRepository);
    }

    @Test
    void findAllByUserId_ReturnsListOfUserRouteInfo() {
        List<UserRouteInfo> expected = List.of(UserRouteInfo.builder().userId(userId).build());
        when(userRouteInfoRepository.findByUserId(userId)).thenReturn(expected);

        List<UserRouteInfo> result = userRouteInfoService.findAllByUserId(userId);

        assertThat(result).isEqualTo(expected);
        verify(userRouteInfoRepository).findByUserId(userId);
    }

    @Test
    void addToFavorites_WhenNotExists_CreatesNewFavorite() {
        when(userRouteInfoRepository.existsByRouteIdAndUserId(routeId, userId)).thenReturn(false);

        userRouteInfoService.addToFavorites(routeId, userId);

        verify(userRouteInfoRepository).save(argThat(info ->
                info.getRouteId().equals(routeId) &&
                        info.getUserId().equals(userId) &&
                        Boolean.TRUE.equals(info.getIsFavorite())
        ));
    }

    @Test
    void addToFavorites_WhenExists_UpdatesFavoriteFlag() {
        UserRouteInfo info = UserRouteInfo.builder().routeId(routeId).userId(userId).isFavorite(false).build();
        when(userRouteInfoRepository.existsByRouteIdAndUserId(routeId, userId)).thenReturn(true);
        when(userRouteInfoRepository.findByRouteIdAndUserId(routeId, userId)).thenReturn(info);

        userRouteInfoService.addToFavorites(routeId, userId);

        assertThat(info.getIsFavorite()).isTrue();
        verify(userRouteInfoRepository).save(info);
    }

    @Test
    void removeFromFavorites_WhenNotExists_DoesNothing() {
        when(userRouteInfoRepository.existsByRouteIdAndUserId(routeId, userId)).thenReturn(false);

        userRouteInfoService.removeFromFavorites(routeId, userId);

        verify(userRouteInfoRepository, never()).save(any());
    }

    @Test
    void removeFromFavorites_WhenExists_UpdatesFavoriteFlag() {
        UserRouteInfo info = UserRouteInfo.builder().routeId(routeId).userId(userId).isFavorite(true).build();
        when(userRouteInfoRepository.existsByRouteIdAndUserId(routeId, userId)).thenReturn(true);
        when(userRouteInfoRepository.findByRouteIdAndUserId(routeId, userId)).thenReturn(info);

        userRouteInfoService.removeFromFavorites(routeId, userId);

        assertThat(info.getIsFavorite()).isFalse();
        verify(userRouteInfoRepository).save(info);
    }

    @Test
    void addToPassed_WhenNotExists_CreatesNewPassed() {
        when(userRouteInfoRepository.existsByRouteIdAndUserId(routeId, userId)).thenReturn(false);

        userRouteInfoService.addToPassed(routeId, userId);

        verify(userRouteInfoRepository).save(argThat(info ->
                info.getRouteId().equals(routeId) &&
                        info.getUserId().equals(userId) &&
                        Boolean.TRUE.equals(info.getIsPassed())
        ));
    }

    @Test
    void addToPassed_WhenExists_UpdatesPassedFlag() {
        UserRouteInfo info = UserRouteInfo.builder().routeId(routeId).userId(userId).isPassed(false).build();
        when(userRouteInfoRepository.existsByRouteIdAndUserId(routeId, userId)).thenReturn(true);
        when(userRouteInfoRepository.findByRouteIdAndUserId(routeId, userId)).thenReturn(info);

        userRouteInfoService.addToPassed(routeId, userId);

        assertThat(info.getIsPassed()).isTrue();
        verify(userRouteInfoRepository).save(info);
    }

    @Test
    void removeFromPassed_WhenNotExists_DoesNothing() {
        when(userRouteInfoRepository.existsByRouteIdAndUserId(routeId, userId)).thenReturn(false);

        userRouteInfoService.removeFromPassed(routeId, userId);

        verify(userRouteInfoRepository, never()).save(any());
    }

    @Test
    void removeFromPassed_WhenExists_UpdatesPassedFlag() {
        UserRouteInfo info = UserRouteInfo.builder().routeId(routeId).userId(userId).isPassed(true).build();
        when(userRouteInfoRepository.existsByRouteIdAndUserId(routeId, userId)).thenReturn(true);
        when(userRouteInfoRepository.findByRouteIdAndUserId(routeId, userId)).thenReturn(info);

        userRouteInfoService.removeFromPassed(routeId, userId);

        assertThat(info.getIsPassed()).isFalse();
        verify(userRouteInfoRepository).save(info);
    }
}