const express = require("express");
const router = express.Router();
const controller = require("../controller/imagenes.controller");
const { verifyToken, requireAdmin } = require("../middlewares/auth.middleware");
const { validateImgurUrls } = require('../middlewares/validateUrl.middleware');

// GET públicos
router.get("/", controller.index);
router.get("/:id", controller.getImagenById);

// POST, PUT, DELETE protegidos
router.post("/", verifyToken, requireAdmin, validateImgurUrls, controller.createImagen);
router.put("/:id", verifyToken, requireAdmin, validateImgurUrls, controller.updateImagen);
router.patch("/:id", verifyToken, requireAdmin, validateImgurUrls, controller.modifyImagen);
router.delete("/:id", verifyToken, requireAdmin, controller.deleteImagen);

module.exports = router;
