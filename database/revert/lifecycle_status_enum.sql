-- Revert golf-bogeybuddies:lifecycle_status_enum from pg

BEGIN;

DROP TYPE lifecycle_status;

COMMIT;
