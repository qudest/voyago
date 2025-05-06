package by.smertex.core.dto.service.route.input;

import by.smertex.core.dto.service.route.Tag;

import java.time.Duration;
import java.util.List;

public record RouteFilter(String name,
                          Long createdBy,
                          List<Tag> tags,
                          Float rating,
                          Duration avgTime,
                          Long distance
) {
}
