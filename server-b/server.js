import express from "express";
import adoptionsRouter from "./routes/adoptions.js";

const app = express();
app.use(express.json());

// Adoptio-reitit
app.use("/adoptions", adoptionsRouter);

// Eläinlista frontendille
app.get("/animals", async (req, res) => {
  try {
    const response = await fetch("http://server-a:3000/animals");
    const animals = await response.json();
    res.json(animals);
  } catch (err) {
    console.error("Error fetching animals from Server A:", err);
    res.status(500).json({ error: "Failed to fetch animals" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server B running on port ${PORT}`);
});
