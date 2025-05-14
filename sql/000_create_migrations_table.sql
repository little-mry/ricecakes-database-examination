CREATE TABLE IF NOT EXISTS migrations (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    filename TEXT UNIQUE NOT NULL,
    run_on TIMESTAMP NOT NULL DEFAULT NOW()
)

-- id = INT(an integer in sequential order). "INT GENERATED .... AS IDENTITY" i preferred over SERIAL which is older.
--filename = TEXT, cannot be null, must be unique
--run_on = cannot be null, a timestamp with default present timegit pull