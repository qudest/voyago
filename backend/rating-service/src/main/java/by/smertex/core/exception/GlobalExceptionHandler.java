package by.smertex.core.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ServiceException.class)
    public ProblemDetail handleServiceException(ServiceException e) {
        HttpStatus status = e.getStatus();
        ProblemDetail problemDetail = ProblemDetail.forStatus(status);
        problemDetail.setTitle(status.getReasonPhrase());
        problemDetail.setDetail(e.getMessage());
        return problemDetail;
    }
}
