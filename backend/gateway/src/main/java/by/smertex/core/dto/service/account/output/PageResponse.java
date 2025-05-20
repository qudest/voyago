package by.smertex.core.dto.service.account.output;

import lombok.AllArgsConstructor;
import lombok.Value;

import java.util.List;

@Value
@AllArgsConstructor
public class PageResponse<T> {

    List<T> data;

    Metadata metadata;

    @Value
    private static class Metadata {
        int size;
        int page;
    }
}
