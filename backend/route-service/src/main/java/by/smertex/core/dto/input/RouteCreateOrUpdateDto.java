package by.smertex.core.dto.input;

import by.smertex.core.database.model.RouteTags;
import lombok.Builder;

import java.util.List;

@Builder
public record RouteCreateOrUpdateDto(String name,
                                     Long createByUserId,
                                     RouteTags tags,
                                     List<Long> pointIds) {
}
