package by.smertex.core.dto.output;

import by.smertex.core.database.model.Tag;
import by.smertex.core.dto.input.RoutePoints;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
