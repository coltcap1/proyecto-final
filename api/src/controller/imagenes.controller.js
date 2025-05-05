const { Imagen } = require("../models/core.models");

const index = async (req, res) => {
  try {
    const imagenes = await Imagen.findAll();
    return res.json(imagenes);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error interno del servidor");
  }
};

const getImagenById = async (req, res) => {
  const { id } = req.params;
  try {
    const imagen = await Imagen.findByPk(id);
    if (!imagen) return res.status(404).send("Imagen no encontrada");
    return res.json(imagen);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error interno del servidor");
  }
};

const createImagen = async (req, res) => {
  const { tipo_entidad, id_entidad, nombre_img, url } = req.body;
  try {
    const imagen = await Imagen.create({ tipo_entidad, id_entidad, nombre_img, url });
    return res.status(201).json(imagen);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error al crear imagen");
  }
};

const updateImagen = async (req, res) => {
  const { id } = req.params;
  const { tipo_entidad, id_entidad, nombre_img, url } = req.body;
  try {
    const imagen = await Imagen.findByPk(id);
    if (!imagen) return res.status(404).send("Imagen no encontrada");

    await imagen.update({ tipo_entidad, id_entidad, nombre_img, url });
    return res.json(imagen);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error al actualizar imagen");
  }
};

const modifyImagen = async (req, res) => {
  const { id } = req.params;
  const { tipo_entidad, id_entidad, nombre_img, url } = req.body;
  try {
    const imagen = await Imagen.findByPk(id);
    if (!imagen) return res.status(404).send("Imagen no encontrada");

    imagen.tipo_entidad = tipo_entidad ?? imagen.tipo_entidad;
    imagen.id_entidad = id_entidad ?? imagen.id_entidad;
    imagen.nombre_img = nombre_img ?? imagen.nombre_img;
    imagen.url = url ?? imagen.url;

    await imagen.save();
    return res.json(imagen);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error al modificar imagen");
  }
};

const deleteImagen = async (req, res) => {
  const { id } = req.params;
  try {
    const imagen = await Imagen.findByPk(id);
    if (!imagen) return res.status(404).send("Imagen no encontrada");

    await imagen.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error al eliminar imagen");
  }
};

module.exports = {
  index,
  getImagenById,
  createImagen,
  updateImagen,
  modifyImagen,
  deleteImagen
};
