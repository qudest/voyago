package by.smertex.core.database.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoutePoints {

    private String origin;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "route_waypoints",
            schema = "routes",
            joinColumns = @JoinColumn(name = "route_id")
    )
    @Column(name = "waypoints")
    private List<String> waypoints;

    private String destination;
}