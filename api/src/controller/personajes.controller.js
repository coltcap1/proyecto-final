const { Personaje, Imagen, Habilidad, Mundo } = require("../models/core.models");

const imgurRegex = /^https?:\/\/(?:i\.)?imgur\.com\/.+$/i;

const index = async (req, res) => {
    try {
        const personajes = await Personaje.findAll({
            include: [
                { model: Imagen, as: 'IMAGENES' },
                { model: Habilidad, as: 'HABILIDADES' }
            ]
        });

        return res.json(personajes);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

const getPersonajeById = async (req, res) => {
    const { id } = req.params;
    try {
        const personaje = await Personaje.findByPk(id, {
            include: [
                { model: Imagen, as: 'IMAGENES' },
                { model: Habilidad, as: 'HABILIDADES' }
            ]
        });

        if (!personaje) return res.status(404).send("No existe el personaje");

        return res.json(personaje);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

const createPersonaje = async (req, res) => {
    const { nombre, esEnemigo, historia, iconoUrl, id_mundo, HABILIDADES } = req.body;

    if (!nombre || !iconoUrl || !id_mundo) {
        return res.status(400).json({ error: "nombre, iconoUrl e id_mundo son obligatorios" });
    }

    if (!imgurRegex.test(iconoUrl)) {
        return res.status(400).json({ error: "iconoUrl debe ser una URL válida de Imgur" });
    }

    try {
        const mundo = await Mundo.findByPk(id_mundo);
        if (!mundo) {
            return res.status(404).json({ error: "Mundo no encontrado" });
        }

        const personaje = await Personaje.create({
            nombre,
            esEnemigo,
            historia,
            iconoUrl,
            id_mundo
        });

        // Si vienen habilidades, asociarlas
        if (Array.isArray(HABILIDADES) && HABILIDADES.length > 0) {
            const habilidadesIds = HABILIDADES.map(h => h.id);
            await personaje.setHABILIDADES(habilidadesIds); // relación N:N
        }

        return res.status(201).json(personaje);
    } catch (error) {
        console.error("Error al crear personaje:", error);
        return res.status(500).send("Error interno del servidor");
    }
};


const updatePersonaje = async (req, res) => {
    const { id } = req.params;
    const { nombre, isEnemy, historia, iconoUrl, id_mundo } = req.body;

    try {
        const personaje = await Personaje.findByPk(id);
        if (!personaje) {
            return res.status(404).json({ error: "Personaje no encontrado" });
        }

        if (id_mundo) {
            const mundo = await Mundo.findByPk(id_mundo);
            if (!mundo) {
                return res.status(400).json({ error: "id_mundo inválido" });
            }
        }

        if (iconoUrl && !imgurRegex.test(iconoUrl)) {
            return res.status(400).json({ error: "iconoUrl debe ser una URL válida de Imgur" });
        }

        await personaje.update({ nombre, isEnemy, historia, iconoUrl, id_mundo });
        return res.status(200).json(personaje);
    } catch (error) {
        console.error("Error al modificar personaje:", error);
        return res.status(500).send("Error interno del servidor");
    }
};

const deletePersonaje = async (req, res) => {
    const { id } = req.params;

    try {
        const personaje = await Personaje.findByPk(id);
        if (!personaje) {
            return res.status(404).json({ error: "Personaje no encontrado" });
        }

        // Eliminar imágenes relacionadas (tipo_entidad = 'PERSONAJE')
        //Lo hacemos de está forma porque al ser una entidad polimorfica, es mas facil asegurarse de esta manera a que lo haga el ORM
        await Imagen.destroy({
            where: {
                id_entidad: id,
                tipo_entidad: 'PERSONAJE'
            }
        });

        await personaje.destroy();
        return res.status(200).json({ message: "Personaje eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar personaje:", error);
        return res.status(500).send("Error interno del servidor");
    }
};

const modifyPersonaje = async (req, res) => {
    const { id } = req.params;
    const { nombre, isEnemy, historia, iconoUrl, id_mundo } = req.body;

    try {
        const personaje = await Personaje.findByPk(id);
        if (!personaje) return res.status(404).json({ error: "Personaje no encontrado" });

        if (id_mundo) {
            const mundo = await Mundo.findByPk(id_mundo);
            if (!mundo) {
                return res.status(400).json({ error: "id_mundo inválido" });
            }
        }

        if (iconoUrl && !imgurRegex.test(iconoUrl)) {
            return res.status(400).json({ error: "iconoUrl debe ser una URL válida de Imgur" });
        }

        personaje.nombre = nombre ?? personaje.nombre;
        personaje.isEnemy = isEnemy ?? personaje.isEnemy;
        personaje.historia = historia ?? personaje.historia;
        personaje.iconoUrl = iconoUrl ?? personaje.iconoUrl;
        personaje.id_mundo = id_mundo ?? personaje.id_mundo;

        await personaje.save();
        return res.status(200).json(personaje);
    } catch (error) {
        console.error("Error al modificar personaje:", error);
        return res.status(500).send("Error interno del servidor");
    }
};


module.exports = {
    index,
    createPersonaje,
    getPersonajeById,
    deletePersonaje,
    modifyPersonaje,
    updatePersonaje
};
