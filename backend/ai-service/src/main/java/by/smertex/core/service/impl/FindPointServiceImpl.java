package by.smertex.core.service.impl;

import by.smertex.core.exception.ApiMapException;
import by.smertex.core.service.FindPointsService;
import com.google.maps.GeoApiContext;
import com.google.maps.PlacesApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.PlaceType;
import com.google.maps.model.PlacesSearchResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class FindPointServiceImpl implements FindPointsService {

    @Value("${google.maps.api-key}")
    private String key;

    @Override
    public PlacesSearchResponse findPoints(String country, String city, String placeType) {
        GeoApiContext context = new GeoApiContext.Builder()
                .apiKey(key)
                .build();

        String query = String.format("%s, %s", city, country);

        PlaceType type = PlaceType.valueOf(placeType.toUpperCase());

        try {
            return PlacesApi.textSearchQuery(context, query)
                    .type(type)
                    .await();
        } catch (IOException | InterruptedException | ApiException e) {
            throw new ApiMapException(e.getMessage(), HttpStatus.LOCKED.value());
        }
    }
}
