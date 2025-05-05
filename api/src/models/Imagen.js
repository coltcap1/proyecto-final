const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Imagen = sequelize.define('IMAGENES', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo_entidad: {
    type: DataTypes.ENUM('PERSONAJE', 'MUNDO', 'ESCENARIO', 'HABILIDAD', 'EXTRAS'),
    allowNull: false
  },
  id_entidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion:{
    type:DataTypes.STRING,
    allowNull:true
  }
}, {
  tableName: "IMAGENES",
  timestamps: false
});

module.exports = Imagen;
