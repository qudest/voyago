package by.smertex.core.dto.output;

import lombok.Builder;

@Builder
public record ResponseError(int code,
                            String message) {
}
