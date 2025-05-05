const { Mundo, Imagen } = require("../models/core.models");

const index = async (req, res) => {
    try {
        const mundos = await Mundo.findAll({ include: [{ model: Imagen, as: "IMAGENES" }] });
        return res.json(mundos);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

const getMundoById = async (req, res) => {
    const { id } = req.params;
    try {
        const mundo = await Mundo.findByPk(id, { include: [{ model: Imagen, as: "IMAGENES" }] });
        if (!mundo) return res.status(404).send("Mundo no encontrado");
        return res.json(mundo);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

const createMundo = async (req, res) => {
    const { nombre, historia } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: "nombre es obligatorio" });
    }

    try {
        const mundo = await Mundo.create({ nombre, historia });
        return res.status(201).json(mundo);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};
const updateMundo = async (req, res) => {
    const { id } = req.params;
    const { nombre, historia } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: "Faltan campos obligatorios: nombre" });
    }

    try {
        const mundo = await Mundo.findByPk(id);
        if (!mundo) return res.status(404).json({ error: "Mundo no encontrado" });

        await mundo.update({ nombre, historia });
        return res.status(200).json(mundo);
    } catch (error) {
        console.error("Error al actualizar mundo:", error);
        return res.status(500).send("Error interno del servidor");
    }
};


const deleteMundo = async (req, res) => {
    const { id } = req.params;
    try {
        const mundo = await Mundo.findByPk(id);
        if (!mundo) return res.status(404).send("Mundo no encontrado");

        await mundo.destroy();
        return res.status(200).json({ message: "Mundo eliminado correctamente" }); // No Content
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

const modifyMundo = async (req, res) => {
    const { id } = req.params;
    const { nombre, historia } = req.body;

    try {
        const mundo = await Mundo.findByPk(id);
        if (!mundo) return res.status(404).json({ error: "Mundo no encontrado" });

        mundo.nombre = nombre ?? mundo.nombre;
        mundo.historia = historia ?? mundo.historia;
        await mundo.save();

        return res.json(mundo);
    } catch (error) {
        console.error("Error al modificar mundo:", error);
        return res.status(500).send("Error interno del servidor");
    }
};


module.exports = {
    index,
    getMundoById,
    createMundo,
    updateMundo,
    deleteMundo,
    modifyMundo
};
