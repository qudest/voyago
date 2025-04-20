package by.smertex.core.database.model;

import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@Data
@RedisHash("average_rating")
public class AverageRating implements Serializable {

    @Id
    private Long id;
    private Float averageRating;

    public AverageRating(Long id, Float averageRating) {
        this.id = id;
        this.averageRating = averageRating;
    }
}
