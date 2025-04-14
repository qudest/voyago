package by.smertex.core.database.model.impl;

import by.smertex.core.database.model.AbstractEntity;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import java.util.concurrent.TimeUnit;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@RedisHash("PhoneCode")
public class PhoneCode implements AbstractEntity<String> {

    @Id
    private String phoneNumber;

    private Integer code;

    @TimeToLive(unit = TimeUnit.MINUTES)
    private Long ttl = 3L;

    @Override
    public String getId() {
        return phoneNumber;
    }
}
