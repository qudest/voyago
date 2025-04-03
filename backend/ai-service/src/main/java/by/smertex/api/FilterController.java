package by.smertex.api;

import by.smertex.core.dto.output.GenerateFilterDto;
import org.springframework.http.ResponseEntity;

public interface FilterController {
    ResponseEntity<GenerateFilterDto> generateFilter(Long userId);
}
