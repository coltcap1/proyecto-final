const express = require("express");
const router = express.Router();
const controller = require("../controller/personajes.controller");
const { verifyToken, requireAdmin } = require("../middlewares/auth.middleware");
const { validateImgurUrls } = require('../middlewares/validateUrl.middleware');

//GET públicos
router.get('/', controller.index);
router.get('/:id', controller.getPersonajeById);

// POST, PUT, DELETE protegidos
router.post('/', verifyToken, requireAdmin, validateImgurUrls, controller.createPersonaje);
router.put('/:id', verifyToken, requireAdmin, validateImgurUrls, controller.updatePersonaje);
router.patch('/:id', verifyToken, requireAdmin, validateImgurUrls, controller.modifyPersonaje);
router.delete('/:id', verifyToken, requireAdmin, controller.deletePersonaje);

module.exports = router;