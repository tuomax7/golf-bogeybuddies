-- Revert golf-bogeybuddies:post from pg

BEGIN;

DROP TABLE post;

COMMIT;
