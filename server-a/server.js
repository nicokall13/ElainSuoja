import express from "express";
import animalsRouter from "./routes/animals.js";

const app = express();
app.use(express.json());

// Kuvien haku, AI suositus
app.use("/kuvat", express.static("/data/kuvat"));

// Routes
app.use("/animals", animalsRouter);

// Portti
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server A running on port ${PORT}`);
});
