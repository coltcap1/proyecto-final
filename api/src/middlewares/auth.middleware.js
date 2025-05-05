const jwt = require("jsonwebtoken");
const SECRET = process.env.JTW_KEY;

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) res.status(403).json({ message: "Token requerido" });

    //Viene Bearer tokenhasheado, por eso el split por espacio y el 1, ya que nos interesa el segundo slot
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded; //Adjuntamos info del usuario al request
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido o expirado" });
    }
}


const requireAdmin = (req, res, next) => {
    if(req.user.rol !== 1) { //asumiendo que 1 sea admin
        return res.status(403).json({ message: "Acceso solo para administradores" });
    }
    next();
}

module.exports = {
    verifyToken,
    requireAdmin
}