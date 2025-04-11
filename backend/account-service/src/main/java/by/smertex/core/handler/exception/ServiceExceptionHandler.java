package by.smertex.core.handler.exception;

import by.smertex.core.dto.output.ResponseError;
import by.smertex.core.exception.ServiceException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(basePackages = "by.smertex.core")
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
}
