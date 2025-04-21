package by.smertex.core.exception.impl;

import by.smertex.core.exception.ServiceException;
import org.springframework.http.HttpStatus;

public class CrudException extends ServiceException {

    public CrudException(String message, HttpStatus code) {
        super(message, code);
    }
}
