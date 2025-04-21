package by.smertex.core.dto.output;

import by.smertex.core.database.model.RouteTags;
import lombok.Builder;

import java.time.Duration;
import java.util.List;

@Builder
public record RouteReadDto(String name,
                           Long createBy,
                           RouteTags tags,
                           Float rating,
                           Duration avgTime,
                           Long distance,
                           List<Long> pointIds) {
}
