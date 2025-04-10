package by.smertex.core.configuration;

import by.smertex.core.util.generator.Generator;
import by.smertex.core.util.generator.impl.GeneratorName;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Random;

@Configuration
public class UtilConfiguration {

    @Bean
    public Random random(){
        return new Random();
    }

    @Bean
    public Generator<String> nameGenerator() {
        return new GeneratorName(random());
    }
}
