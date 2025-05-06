package by.smertex.core.handler;

import by.smertex.core.dto.output.ResponseError;
import feign.FeignException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandler {

    @org.springframework.web.bind.annotation.ExceptionHandler(FeignException.class)
    ResponseEntity<ResponseError> handleFeignException(FeignException ex) {
        return ResponseEntity
                .status(ex.status())
                .body(new ResponseError(ex.status(), ex.getMessage()));
    }
}
