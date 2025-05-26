package by.smertex.core.dto.output;

import lombok.Builder;

@Builder
public record ResponseError(String message,
                            int statusCode) {
}
