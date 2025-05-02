--liquibase formatted sql

--changeset qudest:1
CREATE SCHEMA IF NOT EXISTS routes;

--changeset qudest:2
CREATE SEQUENCE IF NOT EXISTS route_seq START WITH 1 INCREMENT BY 3;

--changeset qudest:3
CREATE TABLE routes.routes
(
    id          BIGINT PRIMARY KEY DEFAULT nextval('route_seq'),
    name        VARCHAR(255) NOT NULL UNIQUE,
    by_user_id  BIGINT       NOT NULL,
    origin      VARCHAR(255),
    destination VARCHAR(255),
    distance    BIGINT,
    duration    BIGINT
);

--changeset qudest:4
CREATE TABLE routes.route_tags
(
    route_id BIGINT       NOT NULL,
    tags     VARCHAR(255) NOT NULL,
    CONSTRAINT fk_route_tags_route
        FOREIGN KEY (route_id)
            REFERENCES routes.routes (id)
);

--changeset qudest:5
CREATE TABLE routes.route_waypoints
(
    route_id BIGINT       NOT NULL,
    waypoints VARCHAR(255) NOT NULL,
    CONSTRAINT fk_route_waypoints_route
        FOREIGN KEY (route_id)
            REFERENCES routes.routes (id)
);