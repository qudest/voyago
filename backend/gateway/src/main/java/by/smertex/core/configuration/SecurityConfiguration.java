package by.smertex.core.configuration;

import by.smertex.api.filter.JwtFilter;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtFilter jwtFilter;

    @Value("${in-memory.username}")
    private String username;

    @Value("${in-memory.password}")
    private String password;

    @Bean
    @Order(1)
    SecurityFilterChain swaggerSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
                .securityMatcher("/swagger-ui/**", "/v3/api-docs/**")
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().hasRole("SWAGGER")
                )
                .httpBasic(Customizer.withDefaults())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .build();
    }

    @Bean
    @Order(2)
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/api/security/**").anonymous()
                                .requestMatchers("/api/subscription/**").authenticated()
                                .requestMatchers("/api/account/**").authenticated()
                                .requestMatchers("/api/ratings/**").authenticated()
                                .requestMatchers("/api/routes/**").authenticated()
                                .requestMatchers("/**").permitAll()
                )
                .exceptionHandling(exceptions -> exceptions
                        .accessDeniedHandler((request, response, ex) ->
                                response.sendError(HttpServletResponse.SC_NOT_FOUND)
                        )
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public InMemoryUserDetailsManager userDetailsService() {
        UserDetails swaggerUser = User.builder()
                .username(username)
                .password(password)
                .roles("SWAGGER")
                .build();
        return new InMemoryUserDetailsManager(swaggerUser);
    }

    @Bean
    @SuppressWarnings("all")
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }
}
