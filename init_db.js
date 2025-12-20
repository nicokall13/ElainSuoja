const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

(async () => {
  const db = await open({
    filename: "./data/elainsuoja.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
        CREATE TABLE IF NOT EXISTS animals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            species TEXT NOT NULL,
            image TEXT,
            description TEXT
        );
        CREATE TABLE IF NOT EXISTS adoptions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            animal_id INTEGER NOT NULL,
            applicant_name TEXT NOT NULL,
            message TEXT,
            status TEXT DEFAULT 'pending',
            FOREIGN KEY (animal_id) REFERENCES animals (id)
        );
    `);

  // Lisätään testi-eläimiä vain jos taulu on tyhjä
  const count = await db.get("SELECT COUNT(*) as count FROM animals");
  if (count.count === 0) {
    await db.run(
      "INSERT INTO animals (name, species, description) VALUES (?, ?, ?)",
      ["Musti", "Koira", "Ystävällinen saksanpaimenkoira."]
    );
    await db.run(
      "INSERT INTO animals (name, species, description) VALUES (?, ?, ?)",
      ["Misu", "Kissa", "Leikkisä oranssi kissa."]
    );
    console.log("Testidata lisätty.");
  }

  console.log("Tietokanta valmis!");
  process.exit();
})();
