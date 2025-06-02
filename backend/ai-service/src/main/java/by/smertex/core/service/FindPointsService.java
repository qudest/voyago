package by.smertex.core.service;

import com.google.maps.model.PlacesSearchResponse;

public interface FindPointsService {
    PlacesSearchResponse findPoints(String country, String city, String placeType);
}
