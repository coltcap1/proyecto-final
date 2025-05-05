const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Mundo = sequelize.define("MUNDOS", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    historia: DataTypes.STRING
}, {
    tableName: "MUNDOS",
    timestamps: false
});


console.log("Mundo: ", Mundo);

module.exports = Mundo;
