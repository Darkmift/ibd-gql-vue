-- SQLite
DROP TABLE IF EXISTS builds;

CREATE TABLE IF NOT EXISTS builds (
    buildId TEXT UNIQUE NOT NULL,
    startTime TEXT DEFAULT (CURRENT_TIMESTAMP),
    endTime TEXT DEFAULT (CURRENT_TIMESTAMP),
    caption TEXT NOT NULL,
    command TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('success', 'failed', 'canceled')), -- Enum-like constraint for status
    errorsNumber INTEGER DEFAULT 0,
    warningsNumber INTEGER DEFAULT 0
);

-- SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;
SELECT sql FROM sqlite_master WHERE type='table' AND name='builds';
