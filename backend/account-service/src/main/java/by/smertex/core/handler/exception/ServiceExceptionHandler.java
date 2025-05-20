package by.smertex.core.handler.exception;

import by.smertex.core.dto.output.ResponseError;
import by.smertex.core.exception.ServiceException;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice(basePackages = "by.smertex")
public class ServiceExceptionHandler {

    @ExceptionHandler(ServiceException.class)
    ResponseEntity<ResponseError> serviceException(ServiceException e) {
        return ResponseEntity
                .status(e.getCode())
                .body(ResponseError.builder()
                        .code(e.getCode())
                        .message(e.getMessage())
                        .build()
                );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @SuppressWarnings("all")
    ResponseEntity<Object> methodArgumentNotValidException(MethodArgumentNotValidException e) {
        Map<String, String> errorMessage = e.getFieldErrors().stream()
                .collect(
                        Collectors.toMap(FieldError::getField, DefaultMessageSourceResolvable::getDefaultMessage)
                );
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }
}
