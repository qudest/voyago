package by.smertex;

import by.smertex.core.AbstractTest;
import by.smertex.core.configuration.UtilConfiguration;
import by.smertex.core.util.generator.Generator;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

@ContextConfiguration(classes = {UtilConfiguration.class})
public class GeneratorNameTest extends AbstractTest {

    @Autowired
    private Generator<String> generatorName;

    @Test
    @DisplayName("Test name generate")
    void generateName(){
        String name = generatorName.generate();
        Assertions.assertEquals(name.length(), 16);
        Assertions.assertTrue(name.matches("[a-zA-Z]{7}\\d{9}"));
    }
}
