package by.smertex.core.database.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(schema = "routes", name = "routes")
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "route_seq")
    @SequenceGenerator(name = "route_seq", sequenceName = "route_seq", allocationSize = 3)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(name = "by_user_id", nullable = false)
    private Long createdBy;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "route_tags", schema = "routes",
            joinColumns = @JoinColumn(name = "route_id")
    )
    @Enumerated(EnumType.STRING)
    @Column(name = "tags")
    private List<Tag> tags;

    @Embedded
    private RoutePoints routePoints;

    private Long distance;

    private Long duration;
}
