const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Rol = sequelize.define("ROLES", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rol: DataTypes.STRING
}, {
    tableName: "ROLES",
    timestamps: false
});

module.exports = Rol;
