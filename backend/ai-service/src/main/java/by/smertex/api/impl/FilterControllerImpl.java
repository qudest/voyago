package by.smertex.api.impl;

import by.smertex.api.FilterController;
import by.smertex.core.dto.input.GenerationConditionDto;
import by.smertex.core.dto.output.GenerateFilterDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/filter")
@RequiredArgsConstructor
public class FilterControllerImpl implements FilterController {

    @GetMapping("/{user-id}")
    public ResponseEntity<GenerateFilterDto> generateFilter(Long userId, GenerationConditionDto dto) {
        return null;
    }
}
