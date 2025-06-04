package by.smertex.core.database.model;

public enum Tag {

    PARK("park"),
    CAFE("cafe"),
    BAR("bar"),
    SHOPPING("shopping_mall"),
    ARCHITECTURE("museum"),
    SPORT("gym");

    private String value;

    Tag(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
