-- Verify golf-bogeybuddies:post on pg

BEGIN;

SELECT
  id, created_at, updated_at, subject, content, author
FROM post
LIMIT 1;

ROLLBACK;
