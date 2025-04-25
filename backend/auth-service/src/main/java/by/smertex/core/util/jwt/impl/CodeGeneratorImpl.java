package by.smertex.core.util.jwt.impl;

import by.smertex.core.util.jwt.CodeGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
@RequiredArgsConstructor
public class CodeGeneratorImpl implements CodeGenerator<Integer> {

    private static final Integer MIN_VALUE = 100_000;

    private static final Integer MAX_VALUE = 900_000;

    private final Random random;

    @Override
    public Integer generate() {
        return MIN_VALUE + random.nextInt(MAX_VALUE);
    }
}
