package by.smertex.core.service.impl;

import by.smertex.core.client.AccountServiceClient;
import by.smertex.core.database.model.RoutePoints;
import by.smertex.core.database.model.Tag;
import by.smertex.core.dto.input.GenerateRouteDto;
import by.smertex.core.dto.output.AccountReadDto;
import by.smertex.core.dto.output.RouteReadDto;
import by.smertex.core.exception.ServiceException;
import by.smertex.core.service.FindPointsService;
import by.smertex.core.service.GenerateRouteService;
import by.smertex.core.util.generator.Generator;
import com.google.maps.model.PlacesSearchResponse;
import com.google.maps.model.PlacesSearchResult;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GenerateRouteServiceImpl implements GenerateRouteService {

    private final AccountServiceClient accountServiceClient;

    private final FindPointsService findPointsService;

    private final Generator<String> nameGenerator;

    private final Random random;

    private int min = 6;

    private int max = 12;

    @Override
    public RouteReadDto generateRoute(GenerateRouteDto dto) {
        AccountReadDto account = accountServiceClient.findAccountByPhoneNumber(dto.phone());

        List<PlacesSearchResult> allResults = new ArrayList<>();
        List<Tag> preferences = account.preferences();

        int totalPoints = random.nextInt(max - min + 1) + min;
        int pointsPerPreference = Math.max(1, totalPoints / preferences.size());

        for (Tag pref : preferences) {
            PlacesSearchResponse response = findPointsService.findPoints(dto.country(), dto.city(), pref.getValue());

            PlacesSearchResult[] prefResults = response.results;
            if (prefResults.length == 0) continue;

            Set<Integer> usedIndices = new HashSet<>();
            int count = Math.min(pointsPerPreference, prefResults.length);

            while (usedIndices.size() < count) {
                int index = random.nextInt(prefResults.length);
                if (usedIndices.add(index)) {
                    allResults.add(prefResults[index]);
                }
            }
        }

        if (allResults.isEmpty()) {
            throw new ServiceException("No points found for selected preferences", HttpStatus.CONFLICT.value());
        }

        Collections.shuffle(allResults);
        List<String> placeIds = allResults.stream()
                .map(result -> result.placeId)
                .distinct()
                .collect(Collectors.toList());

        if (placeIds.size() < 2) {
            throw new ServiceException("Not enough unique points to form a route", HttpStatus.CONFLICT.value());
        }

        RoutePoints routePoints = RoutePoints.builder()
                .origin(placeIds.get(0))
                .destination(placeIds.get(placeIds.size() - 1))
                .waypoints(placeIds)
                .build();

        return RouteReadDto.builder()
                .routePoints(routePoints)
                .createdBy(account.id())
                .name(nameGenerator.generate())
                .tags(account.preferences())
                .rating(0.0F)
                .build();
    }
}
