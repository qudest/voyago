package by.smertex.core.database.model;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class RoutePoints {

    private String origin;

    private List<String> waypoints;

    private String destination;
}