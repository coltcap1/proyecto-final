const { Habilidad, Imagen, Personaje } = require("../models/core.models");

const index = async (req, res) => {
    try {
        const habilidades = await Habilidad.findAll({
            include: [
                { model: Imagen, as: "IMAGENES" },
                { model: Personaje, as: "PERSONAJES" }
            ]
        });
        return res.json(habilidades);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

const getHabilidadById = async (req, res) => {
    const { id } = req.params;
    try {
        const habilidad = await Habilidad.findByPk(id, {
            include: [
                { model: Imagen, as: "IMAGENES" },
                { model: Personaje, as: "PERSONAJES" }
            ]
        });
        if (!habilidad) return res.status(404).send("Habilidad no encontrada");
        return res.json(habilidad);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

const createHabilidad = async (req, res) => {
    const { nombre, dano, iconoUrl, PERSONAJES } = req.body;
  
    try {
      const habilidad = await Habilidad.create({ nombre, dano, iconoUrl });
  
      // Si vienen personajes asociados, asociarlos
      if (Array.isArray(PERSONAJES) && PERSONAJES.length > 0) {
        const personajesIds = PERSONAJES.map(p => p.id);
        await habilidad.setPERSONAJES(personajesIds); // Sequelize se encarga de la tabla intermedia
      }
  
      return res.status(201).json(habilidad);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  };
  

  const updateHabilidad = async (req, res) => {
    const { id } = req.params;
    const { nombre, dano, iconoUrl, PERSONAJES } = req.body;

    if (!nombre || dano == null || !iconoUrl) {
        return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    try {
        const habilidad = await Habilidad.findByPk(id);
        if (!habilidad) return res.status(404).send("Habilidad no encontrada");

        await habilidad.update({ nombre, dano, iconoUrl });

        // Actualizar personajes asociados si vienen en el body
        if (Array.isArray(PERSONAJES)) {
            const personajesIds = PERSONAJES.map(p => p.id);
            await habilidad.setPERSONAJES(personajesIds); // Esto actualiza la tabla intermedia
        }

        return res.json(habilidad);
    } catch (error) {
        console.error("Error al actualizar habilidad:", error);
        return res.status(500).send("Internal Server Error");
    }
};


const modifyHabilidad = async (req, res) => {
    const { id } = req.params;
    const { nombre, dano, iconoUrl } = req.body;

    try {
        const habilidad = await Habilidad.findByPk(id);
        if (!habilidad) return res.status(404).send("Habilidad no encontrada");

        if (nombre !== undefined) habilidad.nombre = nombre;
        if (dano !== undefined) habilidad.dano = dano;
        if (iconoUrl !== undefined) habilidad.iconoUrl = iconoUrl;

        await habilidad.save();
        return res.json(habilidad);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

const deleteHabilidad = async (req, res) => {
    const { id } = req.params;

    try {
        const habilidad = await Habilidad.findByPk(id);
        if (!habilidad) return res.status(404).send("Habilidad no encontrada");

        // Eliminar imágenes relacionadas (tipo_entidad = 'HABILIDAD')
        //Lo hacemos de está forma porque al ser una entidad polimorfica, es mas facil asegurarse de esta manera a que lo haga el ORM
        await Imagen.destroy({
            where: {
                id_entidad: id,
                tipo_entidad: 'HABILIDAD'
            }
        });

        await habilidad.destroy();
        return res.sendStatus(204); // No Content
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};


module.exports = {
    index,
    getHabilidadById,
    createHabilidad,
    updateHabilidad,
    modifyHabilidad,
    deleteHabilidad
};

