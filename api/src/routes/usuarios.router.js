// usuarios.router.js
const express = require("express");
const router = express.Router();
const controller = require("../controller/usuarios.controller");

// Rutas públicas
router.get("/", controller.getUsuarios);
router.get("/:id", controller.getUsuarioById);
router.get("/me", verifyToken, controller.me);

module.exports = router;