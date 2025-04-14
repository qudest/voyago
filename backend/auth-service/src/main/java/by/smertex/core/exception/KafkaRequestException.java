package by.smertex.core.exception;

public class KafkaRequestException extends RuntimeException {
    public KafkaRequestException(String message) {
        super(message);
    }
}
