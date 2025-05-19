import { readdir, readFile } from "fs/promises";
import path from "path";
import { query } from "./db/db.js";

const runMigration = async () => {
  // Läser innehållet i filen som skapar migrations-tabellen
  const initSql = await readFile(path.resolve("./sql/000_create_migrations_table.sql"), "utf8");

  // Kör SQL-kommandot som skapar migrations-tabellen i databasen (om den inte redan finns)
  await query(initSql);

  // Skapar en absolut sökväg till sql-mappen där alla migrationsfiler finns
  const migrationDir = path.resolve("sql");

  // Läser in alla filnamn i sql-mappen och sparar dem i en array
  let files = await readdir(migrationDir);

  // Filtrerar fram migrationsfiler som:
  // - Börjar med siffror (t.ex. 001, 002...)
  // - Slutar med .sql
  // - Inte är den första filen (000_create_migrations_table.sql) som redan körts
  files = files
    .filter((file) => /^\d+.*\.sql$/.test(file) && file !== "000_create_migrations_table.sql")
    .sort(); // Sorterar filerna i nummerordning så de körs i rätt ordning

  // Går igenom varje fil en i taget
  for (const file of files) {
    // Kollar om filen redan har körts (finns i migrations-tabellen)
    const { rows } = await query("SELECT 1 FROM migrations WHERE filename = $1", [file]);

    // Om filen redan körts så hoppar vi över den
    if (rows.length > 0) {
      console.log(`Fil ${file} är redan körd, hoppar över`);
      continue; // Gå vidare till nästa fil
    }
    // Läser in SQL-innehållet från filen
    const sql = await readFile(path.join(migrationDir, file), "utf8");
    console.log(`Kör migration: ${file}`);

    // Kör SQL-koden mot databasen
    await query(sql);

    // Loggar att migrationen körts genom att spara filnamn + tid i migrations-tabellen
    await query("INSERT INTO migrations(filename, run_on) VALUES($1, CURRENT_TIMESTAMP)", [file]);
  }

  console.log("Alla nya migrationer har körts");
};

// Kollar om filen körs direkt via terminalen 
// Om ja – kör runMigration och logga eventuella fel
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigration().catch((err) => {
    console.error("Migrationen misslyckades", err);
    process.exit(1);
  });
}

export { runMigration };
