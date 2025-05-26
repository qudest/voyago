package by.smertex.core.database.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(schema = "ratings", name = "ratings", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"element_id", "from_user_id"})
})
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", sequenceName = "user_seq", allocationSize = 3)
    private Long id;

    @Column(name = "element_id", nullable = false)
    private Long routeId;

    @Column(nullable = false)
    private Integer rating;

    @Column(name = "from_user_id", nullable = false)
    private Long userId;
}
