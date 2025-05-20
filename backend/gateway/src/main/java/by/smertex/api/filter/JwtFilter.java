package by.smertex.api.filter;

import by.smertex.core.client.AuthServiceClient;
import by.smertex.core.dto.service.auth.output.JwtClaims;
import com.fasterxml.jackson.databind.ObjectMapper;
import feign.FeignException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final String HEADER = "Authorization";

    private final String BEARER = "Bearer ";

    private final ObjectMapper objectMapper;

    private final AuthServiceClient authServiceClient;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader(HEADER);
        JwtClaims jwtClaims = null;

        if (authHeader != null && authHeader.startsWith(BEARER)) {
           String jwt = authHeader.substring(BEARER.length());
           try {
               jwtClaims = authServiceClient.validateToken(jwt);
           } catch (FeignException e) {
               response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
               response.setContentType(MediaType.APPLICATION_JSON_VALUE);
               response.getWriter().write(
                       objectMapper.writeValueAsString(
                               e.getMessage()
                       )
               );
               return;
           }
        }

        if (jwtClaims != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                    jwtClaims.name(),
                    null,
                    List.of(jwtClaims.role())
            );
            SecurityContextHolder.getContext().setAuthentication(token);
        }
        filterChain.doFilter(request, response);
    }
}
