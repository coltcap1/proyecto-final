const express = require("express");
const router = express.Router();
const controller = require("../controller/escenarios.controller");
const { verifyToken, requireAdmin } = require("../middlewares/auth.middleware");



// GET públicos
router.get("/", controller.index);
router.get("/:id", controller.getEscenarioById);

// POST, PUT, DELETE protegidos
router.post("/", verifyToken, requireAdmin, controller.createEscenario);
router.put("/:id", verifyToken, requireAdmin, controller.updateEscenario );
router.patch('/:id', verifyToken, requireAdmin, controller.modifyEscenario);
router.delete("/:id", verifyToken, requireAdmin, controller.deleteEscenario);


module.exports = router;