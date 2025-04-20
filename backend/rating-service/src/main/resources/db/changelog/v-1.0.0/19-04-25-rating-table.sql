--liquibase formatted sql

--changeset qudest:1
CREATE SCHEMA IF NOT EXISTS ratings;

--changeset qudest:2
CREATE SEQUENCE IF NOT EXISTS user_seq START WITH 1 INCREMENT BY 3;

--changeset qudest:3
CREATE TABLE ratings.ratings
(
    id           BIGINT PRIMARY KEY DEFAULT nextval('user_seq'),
    element_id   BIGINT  NOT NULL,
    rating       INTEGER NOT NULL,
    from_user_id BIGINT  NOT NULL,
    CONSTRAINT unique_element_user UNIQUE (element_id, from_user_id)
);