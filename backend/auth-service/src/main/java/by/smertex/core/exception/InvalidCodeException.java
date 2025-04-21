package by.smertex.core.exception;

public class InvalidCodeException extends AbstractHttpException {
    public InvalidCodeException(String message, int statusCode) {
        super(message, statusCode);
    }
}
