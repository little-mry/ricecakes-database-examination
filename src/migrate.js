import { readdir, readFile } from "fs/promises";
import path from "path";
import { query } from "./db/db.js";

const runMigration = async () => {
  //Reads the content of file 000_create_migrations_table
  const initSql = await readFile(
    path.resolve("./sql/000_create_migrations_table.sql"),
    "utf8"
  );

  //Calls the query-function to create migrations-table
  await query(initSql);

  //Creates a normalized path (where it should look after files, which is in folder /sql)
  const migrationDir = path.resolve("sql");

  //Reads the content of path /sql and returns an array of the files in this folder
  let files = await readdir(migrationDir);

  //Filter the files using a regex ('^'= string starts, '\d+= One or several numbers in a row, '.*'= Zero or several random characters, '\.sql'= The exact characters '.sql')
  //.test() returns true if filename matches the regex-pattern. The filename cannot be '000_create_migrations...'
  files = files
    .filter(
      (file) =>
        /^\d+.*\.sql$/.test(file) && file !== "000_create_migrations_table.sql"
    )
    .sort();

  // Goes through all the element in the array 'files'. Each element is assigned the variable-name 'file' during its iteration
   for (const file of files) {
    //Calls the query-function
    const { rows } = await query(
      //Checks if any row in the migration-table that, in the column 'filename', matches our element´s filename
      "SELECT 1 FROM migrations WHERE filename = $1",
      [file]
    );

    // If a row is a match, "row.length" is bigger than 0 ( the file is already registered in the migration-table)
    if (rows.length > 0) {
      console.log(`Fil ${file} är redan körd, hoppar över`);
      //Starts from the beginning of the loop
      continue;
    }

    const sql = await readFile(path.join(migrationDir, file), "utf8");
    console.log(`Kör migration: ${file}`);
    await query(sql);

    await query("INSERT INTO migrations(filename, run_on) VALUES($1, CURRENT_TIMESTAMP())", [
      file,
    ]);
  } 


  console.log("Alla nya migrationer har körts");
};

if (import.meta.url === `file://${process.argv[1]}`) {
  runMigration().catch((err) => {
    console.error("Migrationen misslyckades", err);
    process.exit(1);
  });
}

export { runMigration };
