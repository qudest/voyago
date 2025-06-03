package by.smertex.core.exception;

import by.smertex.core.dto.output.ResponseError;
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

    @org.springframework.web.bind.annotation.ExceptionHandler(AbstractServiceException.class)
    public ResponseError handle(AbstractServiceException e) {
        return ResponseError.builder()
                .message(e.getMessage())
                .statusCode(e.getCode())
                .build();
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
