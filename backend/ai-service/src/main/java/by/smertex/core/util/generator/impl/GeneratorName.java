package by.smertex.core.util.generator.impl;

import by.smertex.core.util.generator.Generator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
@RequiredArgsConstructor
public class GeneratorName implements Generator<String> {

    private static final String PREFIX = "route";

    private static final Long MIN_VALUE = 100_000_000L;

    private static final Long MAX_VALUE = 999_999_999L;

    private static final Long RANGE = MAX_VALUE - MIN_VALUE + 1;

    private final Random random;

    public String generate() {
        return PREFIX + (MIN_VALUE + random.nextLong(RANGE));
    }
}
