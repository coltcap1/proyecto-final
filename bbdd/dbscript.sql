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



INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/zzgOqR0.jpeg', 'ESCENARIO', 7, 'Alcantarillado - Color', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/G10CSLH.png', 'ESCENARIO', 7, 'Alcantarillado - Linea', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/JVlcWSb.jpeg', 'ESCENARIO', 8, 'Callejones - Color', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/58QXB3u.png', 'ESCENARIO', 8, 'Callejones - Linea', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/58QXB3u.png', 'MUNDO', 6, 'Mundo Bloody Breaker Personajes', 'Diseño de portada');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/rdxAdvH.jpeg', 'PERSONAJE', 25, '404 - Rediseño', 'Diseño de portada');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/1NkjIbU.jpeg', 'PERSONAJE', 26, 'BackpacO - Rediseño', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/uSx8Vub.jpeg', 'PERSONAJE', 30, 'Finn - Rediseño', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/flKshW1.jpeg', 'PERSONAJE', 29, 'Hook - Rediseño', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/ZcZTRtF.jpeg', 'PERSONAJE', 28, 'Jessie - Rediseño', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/jmoZWkn.jpeg', 'PERSONAJE', 27, 'Tenshi - Rediseño', '');










INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/Aj7yxq5.jpeg', 'EXTRAS', 0, '404 - cara', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/kgHZUPG.png', 'EXTRAS', 0, '404 - Desarrollo', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/TMOhERv.jpeg', 'EXTRAS', 0, '404 - expresiones', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/Aa4bu1t.jpeg', 'EXTRAS', 0, '404 - morfología', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/8ix1dYQ.png', 'EXTRAS', 0, '404 - turn arround', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/zZlA0Xv.jpeg', 'EXTRAS', 0, 'Backpack_O - cara', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/FK4EQzr.jpeg', 'EXTRAS', 0, 'Backpack_O - cuerpo', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/U0EYX5q.jpeg', 'EXTRAS', 0, 'Backpack_O - expresiones color', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/WJ46uHh.jpeg', 'EXTRAS', 0, 'Backpack_O - morfología', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/Oc3UXJn.jpeg', 'EXTRAS', 0, 'Backpack_O - expresiones', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/sec9kdw.png', 'EXTRAS', 0, 'Concepto Finn', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/SaMHLQm.jpeg', 'EXTRAS', 0, 'Hook - Desarrollo', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/GIGgZqG.jpeg', 'EXTRAS', 0, 'Jessie Raygun - cara', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/86ciGPs.jpeg', 'EXTRAS', 0, 'Jessie Raygun - cuerpo', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/fYmXv3D.jpeg', 'EXTRAS', 0, 'Jessie Raygun - expresiones b&n', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/7kwWzFQ.jpeg', 'EXTRAS', 0, 'Jessie Raygun - expresiones', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/g856dCp.png', 'EXTRAS', 0, 'Tenshi - Desarrollo', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/xQTLu7c.jpeg', 'EXTRAS', 0, 'Tenshi - expresiones color', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/XquC8RG.jpeg', 'EXTRAS', 0, 'Personajes - Alturas - Libro de arte', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/uWjhBGS.jpeg', 'EXTRAS', 0, 'Personajes - Alturas', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/IQQJ0KP.jpeg', 'PERSONAJE', 31, 'Carnival - acciones', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/GAwhMEl.jpeg', 'PERSONAJE', 31, 'Carnival - expresiones faciales', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/0gyMjEp.jpeg', 'EXTRAS', 0, 'Selector de personajes', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/NjRoebt.png', 'EXTRAS', 0, '1. Concepto inicial', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/NykSmai.jpeg', 'EXTRAS', 0, '2. Conceptos', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/ZulzECP.jpeg', 'EXTRAS', 0, '3. Escena 1', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('https://i.imgur.com/c1N5Fet.jpeg', 'EXTRAS', 0, '3. Escena 2', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('', 'EXTRAS', 0, '', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('', 'EXTRAS', 0, '', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('', 'EXTRAS', 0, '', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('', 'EXTRAS', 0, '', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('', 'EXTRAS', 0, '', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('', 'EXTRAS', 0, '', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('', 'EXTRAS', 0, '', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('', 'EXTRAS', 0, '', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('', 'EXTRAS', 0, '', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('', 'EXTRAS', 0, '', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('', 'EXTRAS', 0, '', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('', 'EXTRAS', 0, '', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('', 'EXTRAS', 0, '', '');

INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES ('', 'EXTRAS', 0, '', '');



