const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Escenario = sequelize.define("ESCENARIOS", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_mundo: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "ESCENARIOS",
    timestamps: false
});

module.exports = Escenario;
