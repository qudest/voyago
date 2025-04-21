package by.smertex.core.dto.output;

import by.smertex.core.database.model.RouteTags;

import java.time.Duration;
import java.util.List;

public record GenerateFilterDto(String creatorName,
                                RouteTags tags,
                                Float rating,
                                Duration avgTime,
                                Long distance,
                                List<Long> pointIds) {
}
