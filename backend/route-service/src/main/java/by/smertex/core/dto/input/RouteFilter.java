package by.smertex.core.dto.input;

import by.smertex.core.database.model.RouteTags;

import java.time.Duration;
import java.util.List;

public record RouteFilter(String name,
                          String creatorName,
                          RouteTags tags,
                          Float rating,
                          Duration avgTime,
                          Long distance,
                          List<Long> pointIds) {
}
