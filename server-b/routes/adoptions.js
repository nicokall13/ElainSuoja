import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

const animalsFile = path.resolve("/data/animals.json");
const adoptionsFile = path.resolve("/data/adoptions.json");

// POST /adoptions
router.post("/", (req, res) => {
  const { animalId, adopterName, email } = req.body;

  const animals = JSON.parse(fs.readFileSync(animalsFile, "utf8"));
  const adoptions = JSON.parse(fs.readFileSync(adoptionsFile, "utf8"));

  const animal = animals.find((a) => a.id == animalId);

  if (!animal) return res.status(404).json({ error: "Eläintä ei löydy" });

  if (animal.status === "adoptoitu")
    return res.status(400).json({ error: "On jo adoptoitu" });

  // Merkitään adoptoiduksi
  animal.status = "adoptoitu";
  fs.writeFileSync(animalsFile, JSON.stringify(animals, null, 2));

  // Tallennetaan adoptiohakemus
  adoptions.push({
    id: adoptions.length + 1,
    animalId,
    adopterName,
    email,
    date: new Date().toISOString(),
  });

  fs.writeFileSync(adoptionsFile, JSON.stringify(adoptions, null, 2));

  res.json({ success: true, message: "Adoptio onnistui" });
});

export default router;
