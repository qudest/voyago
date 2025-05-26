package by.smertex.core.dto.service.auth.output;

import by.smertex.core.dto.service.account.Role;

public record JwtClaims(String name,
                        Role role) {
}
