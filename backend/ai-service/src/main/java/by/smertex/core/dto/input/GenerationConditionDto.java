package by.smertex.core.dto.input;

import by.smertex.core.database.model.Preference;

import java.time.Duration;
import java.util.List;

public record GenerationConditionDto(List<Preference> preferences,
                                     Duration avgTime,
                                     Long distance) {
}
