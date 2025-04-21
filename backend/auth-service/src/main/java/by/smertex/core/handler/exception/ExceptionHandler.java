package by.smertex.core.handler.exception;

import by.smertex.core.dto.output.ResponseError;
import by.smertex.core.exception.AbstractHttpException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;

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
}
