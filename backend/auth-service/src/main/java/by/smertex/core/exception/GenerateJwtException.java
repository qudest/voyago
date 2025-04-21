package by.smertex.core.exception;

public class GenerateJwtException extends AbstractHttpException {

    public GenerateJwtException(String message, int statusCode) {
        super(message, statusCode);
    }
}
