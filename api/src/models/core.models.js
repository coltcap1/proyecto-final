// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

const Personaje = require('./Personaje');
const Imagen = require('./Imagen');
const Mundo = require("./Mundo");
const Rol = require("./Rol");
const Habilidad = require("./Habilidad");
const Escenario = require("./Escenario");
const Usuario = require("./Usuario");
const PersonajeHabilidad = require("./PersonajeHabilidad");


// Registrar asociaciones
//Asociaciones Personaje
Personaje.associate = () => {
  Personaje.hasMany(Imagen, {
    foreignKey: 'id_entidad',
    constraints: false,
    scope: {
      tipo_entidad: 'PERSONAJE'
    },
    as: 'IMAGENES'
  });

  Personaje.belongsToMany(Habilidad,
    {
      through: PersonajeHabilidad,
      foreignKey: 'id_personaje',
      otherKey: 'id_habilidad',
      as: 'HABILIDADES'
    }
  );

  Personaje.belongsTo(Mundo,
    {
      foreignKey: "id_mundo",
      as: "MUNDO"
    });
};


Mundo.associate = () => {
  Mundo.hasMany(Imagen, {
    foreignKey: 'id_entidad',
    constraints: false,
    scope: {
      tipo_entidad: 'MUNDO'
    },
    as: 'IMAGENES'
  });

};

//Asociaciones Escenario
Escenario.associate = () => {
  Escenario.belongsTo(Mundo, {
    foreignKey: "id_mundo",
    as: "MUNDOS"
  });

  Escenario.hasMany(Imagen, {
    foreignKey: 'id_entidad',
    constraints: false,
    scope: {
      tipo_entidad: 'ESCENARIO'
    },
    as: 'IMAGENES'
  });
};

//Asociaciones Habilidad
Habilidad.associate = () => {
  Habilidad.hasMany(Imagen, {
    foreignKey: 'id_entidad',
    constraints: false,
    scope: {
      tipo_entidad: 'HABILIDAD'
    },
    as: 'IMAGENES'
  });
  
  Habilidad.belongsToMany(Personaje, {
    through: PersonajeHabilidad,
    foreignKey: 'id_habilidad',
    otherKey: 'id_personaje',
    as: 'PERSONAJES'
  });
};

// Personaje -> Mundo

// Usuario -> Rol
Usuario.belongsTo(Rol, { foreignKey: "rol_id", as: "rol" });

// Registrar asociaciones ejecutando las funciones
Personaje.associate();
Mundo.associate();
Escenario.associate();
Habilidad.associate();



// Exportar modelos
module.exports = {
  sequelize,
  Sequelize,
  Personaje,
  Imagen,
  Usuario,
  Mundo,
  Escenario,
  Rol,
  Habilidad,
  PersonajeHabilidad
};
