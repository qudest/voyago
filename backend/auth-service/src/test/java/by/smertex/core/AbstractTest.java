package by.smertex.core;

import by.smertex.core.dto.event.PhoneNotificationEvent;
import org.mockito.Mockito;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.core.KafkaTemplate;

@SpringBootTest
@ImportAutoConfiguration(AbstractTest.KafkaMockConfiguration.class)
public abstract class AbstractTest {

    @TestConfiguration
    static class KafkaMockConfiguration{
        @Bean
        KafkaTemplate<String, PhoneNotificationEvent> kafkaTemplate(){
            return Mockito.mock(KafkaTemplate.class);
        }
    }
}
