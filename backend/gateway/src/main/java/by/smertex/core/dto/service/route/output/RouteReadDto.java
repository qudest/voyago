package by.smertex.core.dto.service.route.output;

import by.smertex.core.dto.service.route.Tag;
import by.smertex.core.dto.service.route.input.RoutePoints;

import java.util.List;

public class RouteReadDto {
    private Long id;
    private String name;
    private Long createdBy;
    private List<Tag> tags;
    private RoutePoints routePoints;
    private Long distance;
    private Long duration;
    private Float rating;
}
