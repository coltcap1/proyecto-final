const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const PersonajeHabilidad = sequelize.define('PERSONAJE_HABILIDAD', {
  id_personaje: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_habilidad: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}, {
  tableName: 'PERSONAJE_HABILIDAD',
  timestamps: false
});

module.exports = PersonajeHabilidad;
