const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

const app = express();
const PORT = 4000;

// Middleware JSON-datan käsittelyyn
app.use(express.json());

let db;

/**
 * Käynnistysfunktio:
 * 1. Avaa yhteys tietokantaan
 * 2. Käynnistää Express-palvelimen vasta kun yhteys on valmis
 */
async function startServer() {
  try {
    db = await open({
      filename: "/app/data/elainsuoja.db",
      driver: sqlite3.Database,
    });
    console.log("Server-B: Yhteys SQLite-tietokantaan muodostettu.");

    // Käynnistetään palvelin kuuntelemaan porttia
    app.listen(PORT, () => {
      console.log(`Server-B (Admin API) pyörii portissa ${PORT}`);
    });
  } catch (error) {
    console.error("Server-B käynnistys epäonnistui:", error);
    process.exit(1); // Lopetetaan prosessi kriittiseen virheeseen
  }
}

// Määritellään reitit (Routes)

// GET: Hae kaikki hakemukset ja yhdistä eläimen nimi JOIN-kyselyllä
app.get("/admin/adoptions", async (req, res) => {
  try {
    // Haetaan hakemukset ja liitetään niihin eläimen nimi animals-taulusta
    const query = `
            SELECT 
                adoptions.*, 
                animals.name as animal_name 
            FROM adoptions 
            JOIN animals ON adoptions.animal_id = animals.id
        `;
    const adoptions = await db.all(query);
    res.json(adoptions);
  } catch (error) {
    console.error("Virhe hakemusten haussa:", error);
    res.status(500).json({ error: "Hakemusten haku epäonnistui." });
  }
});

// Suoritetaan käynnistys
startServer();
