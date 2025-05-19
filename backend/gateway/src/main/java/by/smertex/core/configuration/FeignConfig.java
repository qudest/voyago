package by.smertex.core.configuration;

import feign.Client;
import feign.Contract;
import feign.httpclient.ApacheHttpClient;
import org.springframework.cloud.openfeign.support.SpringMvcContract;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignConfig {
    @Bean
    public Client feignClient() {
        return new ApacheHttpClient();
    }

    @Bean
    public Contract feignContract() {
        return new SpringMvcContract();
    }
}
