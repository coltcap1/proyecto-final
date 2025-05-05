const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../models/core.models")

const SECRET = process.env.JTW_KEY;

const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        //Verificar que el usuario no exista
        const userExist = await Usuario.findOne({ where: { email } });
        if (userExist) return res.status(400).json({ message: "El usuario ya existe" });

        //Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        //Crea el usuario (puedes ajustar el rol por defecto)
        const newUser = await Usuario.create({ email, password: hashedPassword, id_rol: 3 }); //El rol 3 es uno ficticio de jugador

        res.status(201).json({ message: "Usuario creado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) return res.status(404).json({ message: "Ha habido un error en el usuario o en la contraseña" });

        const validPassword = await bcrypt.compare(password, usuario.password);
        if (!validPassword) return res.status(401).json({ message: "Ha habido un error en el usuario o en la contraseña" })

        const token = jwt.sign({
            id: usuario.id,
            email: usuario.email,
            rol: usuario.id_rol
        },
            SECRET,
            { expiresIn: "6h" }
        );

        res.json({ token })

    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión", error });
    }
}

module.exports = {
    register,
    login
}