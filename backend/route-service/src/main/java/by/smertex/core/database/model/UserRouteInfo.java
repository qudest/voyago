package by.smertex.core.database.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(schema = "routes", name = "user_route_info")
public class UserRouteInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_route_info_seq")
    @SequenceGenerator(name = "user_route_info_seq", sequenceName = "user_route_info_seq", allocationSize = 3)
    private Long id;

    @Column(name = "route_id", nullable = false)
    private Long routeId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "is_favorite")
    private Boolean isFavorite;

    @Column(name = "is_passed")
    private Boolean isPassed;
}
