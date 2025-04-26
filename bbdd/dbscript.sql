--SCRIPT PARA LA BASE DE DATOS

-- Activar integridad referencial
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS MUNDOS (
    id INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL,
    historia TEXT
);

CREATE TABLE IF NOT EXISTS ESCENARIOS (
    id INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL,
    id_mundo INTEGER NOT NULL,
    FOREIGN KEY (id_mundo) REFERENCES MUNDOS(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PERSONAJES (
    id INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL,
    esEnemigo BOOLEAN NOT NULL,
    historia TEXT,
    iconoUrl TEXT NOT NULL,
    id_mundo INTEGER NOT NULL,
    FOREIGN KEY (id_mundo) REFERENCES MUNDOS(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS HABILIDADES (
    id INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL,
    daño INTEGER NOT NULL,
    iconoUrl TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS PERSONAJE_HABILIDAD (
    id_personaje INTEGER NOT NULL,
    id_habilidad INTEGER NOT NULL,
    PRIMARY KEY (id_personaje, id_habilidad),
    FOREIGN KEY (id_personaje) REFERENCES PERSONAJES(id) ON DELETE CASCADE,
    FOREIGN KEY (id_habilidad) REFERENCES HABILIDADES(id) ON DELETE CASCADE
);

-- Crear tabla IMAGENES con ENUM extendido para incluir EXTRAS
CREATE TABLE IF NOT EXISTS IMAGENES (
    id INTEGER PRIMARY KEY,
    url TEXT NOT NULL,
    tipo_entidad TEXT NOT NULL CHECK (tipo_entidad IN ('MUNDO', 'ESCENARIO', 'PERSONAJE', 'HABILIDAD', 'EXTRAS')),
    id_entidad INTEGER NOT NULL,
    nombre TEXT NOT NULL,
    fecha_subida TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
    descripcion TEXT
    -- Nota: 'EXTRAS' permite almacenar imágenes no asociadas a ninguna entidad, en caso de ser EXTRAS, poner id_entidad en 0
);