-- Revert golf-bogeybuddies:updated_at_trigger from pg

BEGIN;

DROP FUNCTION trigger_set_updated_at();

COMMIT;
