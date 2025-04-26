-- Activamos la integridad referencial por si acaso
PRAGMA foreign_keys = ON;

-- Insertar datos en MUNDOS
INSERT INTO MUNDOS (nombre, historia) VALUES 
('Mundo Fantástico', 'Un lugar lleno de magia y criaturas legendarias.'),
('Mundo Cibernético', 'Un futuro dominado por inteligencia artificial y robots.');

-- Insertar datos en ESCENARIOS
INSERT INTO ESCENARIOS (nombre, id_mundo) VALUES
('Bosque Encantado', 1),
('Castillo Volador', 1),
('Ciudad Neón', 2),
('Laboratorio Subterráneo', 2);

-- Insertar datos en PERSONAJES
INSERT INTO PERSONAJES (nombre, esEnemigo, historia, iconoUrl, id_mundo) VALUES
('Aria la Hechicera', 0, 'Una poderosa maga que protege el bosque.', 'https://cdn-icons-png.freepik.com/256/1752/1752681.png?semt=ais_hybrid', 1),
('Lord Oscuro', 1, 'Un tirano que quiere dominar todos los mundos.', 'https://cdn-icons-png.freepik.com/256/1752/1752745.png?semt=ais_hybrid', 1),
('Cyborg X-23', 1, 'Un experimento de IA fallido convertido en enemigo.', 'https://cdn-icons-png.freepik.com/256/1752/1752735.png?semt=ais_hybrid', 2),
('Nova', 0, 'Una hacker rebelde que lucha contra el sistema.', 'https://cdn-icons-png.freepik.com/256/16025/16025466.png?semt=ais_hybrid', 2);

-- Insertar datos en HABILIDADES
INSERT INTO HABILIDADES (nombre, daño, iconoUrl) VALUES
('Bola de Fuego', 50, 'https://cdn-icons-png.freepik.com/256/7446/7446050.png?semt=ais_hybrid'),
('Rayo Congelante', 40, 'https://cdn-icons-png.freepik.com/256/4994/4994594.png?semt=ais_hybrid'),
('Hackeo Rápido', 30, 'https://cdn-icons-png.freepik.com/256/4029/4029242.png?semt=ais_hybrid'),
('Cañón de Plasma', 60, 'https://cdn-icons-png.freepik.com/256/3521/3521183.png?semt=ais_hybrid');

-- Insertar datos en PERSONAJE_HABILIDAD
INSERT INTO PERSONAJE_HABILIDAD (id_personaje, id_habilidad) VALUES
(1, 1), -- Aria - Bola de Fuego
(1, 2), -- Aria - Rayo Conggelante
(2, 1), -- Lord Oscuro - Bola de Fuego
(3, 4), -- Cyborg X-23 - Cañón de Plasma
(4, 3); -- Nova - Hackeo Rápido

-- Imagen asociada a un Mundo (id_mundo = 1)
INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES (
    'https://img.freepik.com/vector-gratis/plantilla-dibujos-animados-planeta-tierra-espacio_1284-38161.jpg',
    'MUNDO',
    1,
    'Portada Mundo Fantástico',
    'Imagen de portada del mundo lleno de magia.'
);

-- Imagen asociada a un Escenario (id_escenario = 1)
INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES (
    'https://img.freepik.com/foto-gratis/paisaje-nocturno-magico-luces-brillantes_23-2150203061.jpg',
    'ESCENARIO',
    1,
    'Bosque Encantado',
    'Imagen representativa del escenario Bosque Encantado.'
);

-- Imagen asociada a un Personaje (id_personaje = 1)
INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre, descripcion)
VALUES (
    'https://img.freepik.com/vector-gratis/retrato-bella-elfa-sonriente_1196-884.jpg',
    'PERSONAJE',
    1,
    'Retrato de Aria',
    'Retrato oficial de Aria la Hechicera.'
);

-- Imagen tipo EXTRAS (sin asociación directa)
INSERT INTO IMAGENES (url, tipo_entidad, id_entidad, nombre)
VALUES (
    'https://i.imgur.com/XquC8RG.jpeg',
    'EXTRAS',
    0,
    'Banner Altura personajes'
);
