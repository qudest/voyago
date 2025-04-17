package by.smertex.core.exception;

public abstract class AbstractHttpException extends RuntimeException {

    private int statusCode;

    public AbstractHttpException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    public int getStatusCode() {
        return statusCode;
    }
}
