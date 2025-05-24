package by.smertex.core.dto.output;

import lombok.AllArgsConstructor;
import lombok.Value;
import org.springframework.data.domain.Slice;

import java.util.List;

@Value
@AllArgsConstructor
public class PageResponse<T> {

    List<T> data;

    Metadata metadata;

    public static <T> PageResponse<T> toPage(Slice<T> slice) {
        return new PageResponse<>(
                slice.getContent(),
                new Metadata(slice.getSize(), slice.getNumber())
        );
    }

    public static <T> PageResponse<T> toPage(List<T> content, int size, int page) {
        return new PageResponse<>(
                content,
                new Metadata(size, page)
        );
    }

    @Value
    private static class Metadata {
        int size;
        int page;
    }
}
