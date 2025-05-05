const express = require("express");
const router = express.Router();
const controller = require("../controller/mundos.controller");
const { verifyToken, requireAdmin } = require("../middlewares/auth.middleware");


//GET públicos
router.get('/', controller.index)

router.get('/:id', controller.getMundoById)

// POST, PUT, DELETE protegidos
router.post("/", verifyToken, requireAdmin, controller.createMundo);
router.put("/:id", verifyToken, requireAdmin, controller.updateMundo);
router.patch('/:id', verifyToken, requireAdmin, controller.modifyMundo);
router.delete("/:id", verifyToken, requireAdmin, controller.deleteMundo);

module.exports = router;