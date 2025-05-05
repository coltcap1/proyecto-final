const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Personaje = sequelize.define('PERSONAJES', {
    id: {
        type: DataTypes.INTEGER, // usa INTEGER, no NUMBER
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    esEnemigo: DataTypes.BOOLEAN,
    historia: DataTypes.STRING,
    iconoUrl: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "PERSONAJES",
    timestamps: false
});



module.exports = Personaje;
