package by.smertex.core.database.model.impl;

import by.smertex.core.database.model.AbstractEntity;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@RedisHash("PhoneRefreshToken")
public class PhoneRefreshToken implements AbstractEntity<String> {

    @Id
    private String phoneNumber;

    private String refreshToken;

    @Override
    public String getId() {
        return phoneNumber;
    }
}
