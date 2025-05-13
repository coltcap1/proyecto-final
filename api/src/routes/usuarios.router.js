// usuarios.router.js
const express = require("express");
const router = express.Router();
const controller = require("../controller/usuario.controller");
const { verifyToken } = require("../middlewares/auth.middleware");


// Rutas públicas
router.get("/", controller.getUsuarios);
router.get("/:id", controller.getUsuarioById);
router.get("/me", verifyToken, controller.me);

module.exports = router;