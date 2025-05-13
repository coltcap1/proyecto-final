// controller/usuarios.controller.js
const { Usuario, Rol } = require("../models/core.models");

const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            include: [{ model: Rol, as: "rol" }],
            attributes: { exclude: ["contrasena"] }
        });
        return res.json(usuarios);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return res.status(500).send("Error interno del servidor");
    }
};

const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id, {
            include: [{ model: Rol, as: "rol" }],
            attributes: { exclude: ["contrasena"] }
        });

        if (!usuario) return res.status(404).send("Usuario no encontrado");

        return res.json(usuario);
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        return res.status(500).send("Error interno del servidor");
    }
};

module.exports = {
    getUsuarios,
    getUsuarioById
};
