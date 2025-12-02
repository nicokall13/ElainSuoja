import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const dataFile = path.resolve("/data/animals.json");

// GET /animals
router.get("/", (req, res) => {
  const animals = JSON.parse(fs.readFileSync(dataFile, "utf8"));
  res.json(animals);
});

// GET /animals/:id
router.get("/:id", (req, res) => {
  const animals = JSON.parse(fs.readFileSync(dataFile, "utf8"));
  const animal = animals.find((a) => a.id == req.params.id);
  if (!animal) return res.status(404).json({ error: "Not found" });

  res.json(animal);
});

// POST /animals/:id/adopt Adoptio pyyntö
router.post("/:id/adopt", async (req, res) => {
  const animalId = req.params.id;
  const body = req.body;

  const response = await fetch("http://server-b:4000/adoptions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ animalId, ...body }),
  });

  const result = await response.json();
  res.json(result);
});

export default router;
