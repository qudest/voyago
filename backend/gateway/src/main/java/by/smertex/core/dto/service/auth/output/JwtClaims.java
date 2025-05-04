package by.smertex.core.dto.service.auth.output;

import by.smertex.core.dto.service.account.Role;
import lombok.Builder;

@Builder
public record JwtClaims(String name,
                        Role role) {
}
