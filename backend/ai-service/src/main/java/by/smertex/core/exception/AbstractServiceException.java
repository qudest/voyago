package by.smertex.core.exception;

public class AbstractServiceException extends RuntimeException {

    private Integer code;

    public AbstractServiceException(String message, Integer code) {
        super(message);
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }
}
