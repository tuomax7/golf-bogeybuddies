-- Verify golf-bogeybuddies:attachment on pg

BEGIN;

SELECT
  id, created_at, updated_at
FROM attachment
LIMIT 1;

ROLLBACK;
