package by.smertex.core.dto.input;

import by.smertex.core.database.model.Tag;

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
