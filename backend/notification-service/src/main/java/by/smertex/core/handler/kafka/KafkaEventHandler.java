package by.smertex.core.handler.kafka;

public interface KafkaEventHandler<T> {
    void receive(T event);
}
