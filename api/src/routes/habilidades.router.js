const express = require("express");
const router = express.Router();
const controller = require("../controller/habilidades.controller");
const { verifyToken, requireAdmin } = require("../middlewares/auth.middleware");
const { validateImgurUrls } = require('../middlewares/validateUrl.middleware');


// GET públicos
router.get('/', controller.index)
router.get('/:id', controller.getHabilidadById)

// POST, PUT, DELETE protegidos
router.post("/", verifyToken, requireAdmin, validateImgurUrls, controller.createHabilidad);
router.put("/:id", verifyToken, requireAdmin, validateImgurUrls, controller.updateHabilidad);
router.patch("/:id", verifyToken, requireAdmin, validateImgurUrls, controller.modifyHabilidad);
router.delete("/:id", verifyToken, requireAdmin, controller.deleteHabilidad);


module.exports = router;