package by.smertex.core.handler.kafka;

public interface AbstractKafkaHandler<E> {
    void receive(E event);
}
