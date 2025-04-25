package by.smertex.core.dto.output;

import lombok.Builder;

@Builder
public record JwtClaims(String name,
                        String role) {
}
