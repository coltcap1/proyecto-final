require("dotenv").config();
const cors = require("cors")
const express = require("express");
const mainRouter = require("./src/routes/main.router");

const app = express();
app.use(cors());

//Middlewares
app.use(express.json());

app.get('/', (req, res) => {
    res.send("API de Express funcionando correctamente!");
});

app.use("/api", mainRouter); // prefijo general opcional, ej: /api/personajes

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));