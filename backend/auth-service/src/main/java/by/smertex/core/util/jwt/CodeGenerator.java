package by.smertex.core.util.jwt;

import java.io.Serializable;

public interface CodeGenerator<T extends Serializable> {
    T generate();
}
