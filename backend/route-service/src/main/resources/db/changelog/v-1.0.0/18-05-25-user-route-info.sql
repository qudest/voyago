--liquibase formatted sql

--changeset qudest:6
CREATE SEQUENCE IF NOT EXISTS user_route_info_seq START WITH 1 INCREMENT BY 3;

--changeset qudest:7
CREATE TABLE routes.user_route_info
(
    id          BIGINT PRIMARY KEY DEFAULT nextval('user_route_info_seq'),
    route_id    BIGINT       NOT NULL,
    user_id     BIGINT       NOT NULL,
    is_favorite BOOLEAN,
    is_passed   BOOLEAN
);