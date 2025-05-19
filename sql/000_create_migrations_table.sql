-- Skapar en tabell för att hålla koll på vilka migrationsfiler som har körts.
-- Varje rad representerar en körd migrationsfil med filnamn och tidsstämpel.
CREATE TABLE IF NOT EXISTS migrations (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- Unikt ID som skapas automatiskt
    filename TEXT UNIQUE NOT NULL,                   -- Namnet på migrationsfilen
    run_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP -- Tidpunkt då migrationen kördes
);
