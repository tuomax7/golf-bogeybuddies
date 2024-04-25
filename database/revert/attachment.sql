-- Revert golf-bogeybuddies:attachment from pg

BEGIN;

DROP TABLE attachment;

COMMIT;
