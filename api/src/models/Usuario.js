const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Usuario = sequelize.define("USUARIOS", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    contrasena: DataTypes.STRING,
    email: DataTypes.STRING,
    rol_id: DataTypes.INTEGER
}, {
    tableName: 'USUARIOS',
    timestamps: false
});

module.exports = Usuario;
