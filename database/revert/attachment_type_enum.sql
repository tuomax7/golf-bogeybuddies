-- Revert golf-bogeybuddies:attachment_type_enum from pg

BEGIN;

DROP TYPE attachment_type;

COMMIT;
