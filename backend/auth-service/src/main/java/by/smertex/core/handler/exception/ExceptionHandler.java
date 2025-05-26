package by.smertex.core.handler.exception;

import by.smertex.core.dto.output.ResponseError;
import by.smertex.core.exception.AbstractHttpException;
import io.jsonwebtoken.JwtException;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ExceptionHandler {

    @org.springframework.web.bind.annotation.ExceptionHandler(AbstractHttpException.class)
    public ResponseEntity<ResponseError> handle(AbstractHttpException e) {
        return ResponseEntity
                .status(e.getStatusCode())
                .body(ResponseError.builder()
                        .message(e.getMessage())
                        .statusCode(e.getStatusCode())
                        .build()
                );
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(JwtException.class)
    public ResponseEntity<ResponseError> handle(JwtException e) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED.value())
                .body(ResponseError.builder()
                        .message(e.getMessage())
                        .statusCode(HttpStatus.UNAUTHORIZED.value())
                        .build()
                );
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(MethodArgumentNotValidException.class)
    @SuppressWarnings("all")
    ResponseEntity<Object> methodArgumentNotValidException(MethodArgumentNotValidException e) {
        Map<String, String> errorMessage = e.getFieldErrors().stream()
                .collect(
                        Collectors.toMap(FieldError::getField, DefaultMessageSourceResolvable::getDefaultMessage)
                );
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }
}
