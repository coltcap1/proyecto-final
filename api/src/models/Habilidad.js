const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Habilidad = sequelize.define("HABILIDADES", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: DataTypes.STRING,
    dano: DataTypes.INTEGER,
    iconoUrl: DataTypes.STRING
}, {
    tableName: "HABILIDADES",
    timestamps: false
});


console.log("Habilidades: ", Habilidad);


module.exports = Habilidad;
