const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

const app = express();
app.use(express.json());

// Tarjoillaan kuvat
app.use("/kuvat", express.static("/app/data/kuvat"));

let db;
(async () => {
  db = await open({
    filename: "/app/data/elainsuoja.db",
    driver: sqlite3.Database,
  });
  console.log("Server-A: Tietokanta valmis.");
})();

// 1. Hae KAIKKI eläimet
app.get("/api/animals", async (req, res) => {
  const animals = await db.all(
    "SELECT id, name, species AS type, age, image FROM animals"
  );
  res.json(animals);
});

// 2. Hae YKSITTÄINEN eläin
app.get("/api/animals/:id", async (req, res) => {
  try {
    const animal = await db.get(
      "SELECT id, name, species AS type, age, breed, image, description, status FROM animals WHERE id = ?",
      [req.params.id]
    );
    if (animal) {
      res.json(animal);
    } else {
      res.status(404).json({ error: "Eläintä ei löydy." });
    }
  } catch (e) {
    res.status(500).json({ error: "Tietokantavirhe." });
  }
});

// 3. Tallenna ADOPTIO
app.post("/api/animals/:id/adopt", async (req, res) => {
  const { adopterName, email } = req.body; // Nämä tulevat frontendin apps.js:stä
  const animalId = req.params.id;

  try {
    await db.run(
      "INSERT INTO adoptions (animal_id, applicant_name, message) VALUES (?, ?, ?)",
      [animalId, adopterName, email]
    );
    res.json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, error: "Tallennus epäonnistui." });
  }
});

app.listen(3000, () => console.log("Server-A pyörii portissa 3000"));
