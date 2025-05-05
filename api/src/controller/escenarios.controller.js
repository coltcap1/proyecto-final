const { Escenario, Mundo, Imagen } = require("../models/core.models");

const index = async (req, res) => {
    try {
        const escenarios = await Escenario.findAll({
            include: [
                { model: Mundo, as: "MUNDOS" },
                { model: Imagen, as: "IMAGENES" }
            ]
        });
        return res.json(escenarios);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

const getEscenarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const escenario = await Escenario.findByPk(id, {
            include: [
                { model: Mundo, as: "MUNDOS" },
                { model: Imagen, as: "IMAGENES" }
            ]
        });
        if (!escenario) return res.status(404).send("Escenario no encontrado");
        return res.json(escenario);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

const createEscenario = async (req, res) => {
    const { nombre, id_mundo } = req.body;
    try {
        const escenario = await Escenario.create({ nombre, id_mundo });
        return res.status(201).json(escenario);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};
const updateEscenario = async (req, res) => {
    const { id } = req.params;
    const { nombre, id_mundo } = req.body;

    if (!nombre || !id_mundo) {
        return res.status(400).json({ error: "Faltan campos obligatorios: nombre e id_mundo" });
    }

    try {
        const escenario = await Escenario.findByPk(id);
        if (!escenario) {
            return res.status(404).json({ error: "Escenario no encontrado" });
        }

        // Validar que el mundo exista
        const mundo = await Mundo.findByPk(id_mundo);
        if (!mundo) {
            return res.status(400).json({ error: "id_mundo inválido, no existe ese mundo" });
        }

        await escenario.update({ nombre, id_mundo });
        return res.status(200).json(escenario);
    } catch (error) {
        console.error("Error al actualizar escenario:", error);
        return res.status(500).send("Error interno del servidor");
    }
};

const modifyEscenario = async (req, res) => {
    const { id } = req.params;
    const { nombre, id_mundo } = req.body;

    try {
        const escenario = await Escenario.findByPk(id);
        if (!escenario) return res.status(404).json({ error: "Escenario no encontrado" });

        escenario.nombre = nombre ?? escenario.nombre;
        escenario.id_mundo = id_mundo ?? escenario.id_mundo;
        await escenario.save();

        return res.json(escenario);
    } catch (error) {
        console.error("Error al modificar escenario:", error);
        return res.status(500).send("Error interno del servidor");
    }
};



const deleteEscenario = async (req, res) => {
    const { id } = req.params;
    try {
        const escenario = await Escenario.findByPk(id);
        if (!escenario) return res.status(404).send("Escenario no encontrado");

        // Eliminar imágenes relacionadas (tipo_entidad = 'ESCENARIO')
        //Lo hacemos de está forma porque al ser una entidad polimorfica, es mas facil asegurarse de esta manera a que lo haga el ORM
        await Imagen.destroy({
            where: {
                id_entidad: id,
                tipo_entidad: 'ESCENARIO'
            }
        });

        await escenario.destroy();
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    index,
    getEscenarioById,
    createEscenario,
    updateEscenario,
    deleteEscenario,
    modifyEscenario
};

