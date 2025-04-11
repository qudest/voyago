package by.smertex.core.exception.impl;

import by.smertex.core.exception.ServiceException;

public class CrudException extends ServiceException {

    public CrudException(String message, int code) {
        super(message, code);
    }
}
