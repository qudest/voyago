package by.smertex.core.exception;

public abstract class ServiceException extends RuntimeException {

    private final int code;

    public ServiceException(String message, int code) {
        super(message);
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
