--liquibase formatted sql

--changeset smertex:1
CREATE SCHEMA IF NOT EXISTS account

--changeset smertex:2
CREATE SEQUENCE IF NOT EXISTS account_seq START WITH 1 INCREMENT BY 3

--changeset smertex:3
CREATE TABLE account.account
(
    id              BIGINT          PRIMARY KEY         DEFAULT nextval('account_seq'),
    name            VARCHAR(32)     UNIQUE,
    phone_number    VARCHAR(11)     UNIQUE  NOT NULL,
    role            VARCHAR(16)     NOT NULL,
    status          VARCHAR(16)     NOT NULL,
    premium         BOOLEAN         NOT NULL,
    end_date        TIMESTAMP,
    country         TEXT,
    city            TEXT,
    credit_card     TEXT            UNIQUE
)

--changeset smertex:4
CREATE TABLE account.account_preferences
(
    account_id   BIGINT             REFERENCES account.account(id),
    preference   TEXT,
    PRIMARY KEY (account_id, preference)
)