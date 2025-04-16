package by.smertex.core.exception;

public class KafkaResponseException extends RuntimeException {
    public KafkaResponseException(String message) {
        super(message);
    }
}
