package by.smertex.core.exception;

public class InvalidRefreshException extends AbstractHttpException {
    public InvalidRefreshException(String message, int statusCode) {
        super(message, statusCode);
    }
}
