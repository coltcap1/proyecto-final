const express = require("express");
const router = express.Router();

// Importación de routers individuales
const personajesRouter = require("./personajes.router");
const mundosRouter = require("./mundos.router");
const habilidadesRouter = require("./habilidades.router");
const escenariosRouter = require("./escenarios.router");
const imagenesRouter = require("./imagenes.router");

// Asociación de rutas base
router.use("/personajes", personajesRouter);
router.use("/mundos", mundosRouter);
router.use("/habilidades", habilidadesRouter);
router.use("/escenarios", escenariosRouter);
router.use("/imagenes", imagenesRouter)

module.exports = router;
