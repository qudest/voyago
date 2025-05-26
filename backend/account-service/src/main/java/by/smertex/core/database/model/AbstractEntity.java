package by.smertex.core.database.model;

import java.io.Serializable;

public interface AbstractEntity<ID extends Serializable> {
    ID getId();

    void setId(ID id);
}
