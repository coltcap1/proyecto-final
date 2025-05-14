-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para coltcap_bloodybreakers
CREATE DATABASE IF NOT EXISTS `coltcap_bloodybreakers` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `coltcap_bloodybreakers`;




-- Volcando estructura para tabla coltcap_bloodybreakers.HABILIDADES
CREATE TABLE IF NOT EXISTS `HABILIDADES` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `dano` int(11) NOT NULL,
  `iconoUrl` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



-- Volcando estructura para tabla coltcap_bloodybreakers.IMAGENES
CREATE TABLE IF NOT EXISTS `IMAGENES` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `tipo_entidad` enum('MUNDO','ESCENARIO','PERSONAJE','HABILIDAD','EXTRAS') NOT NULL,
  `id_entidad` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Volcando estructura para tabla coltcap_bloodybreakers.MUNDOS
CREATE TABLE IF NOT EXISTS `MUNDOS` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `historia` text DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Volcando estructura para tabla coltcap_bloodybreakers.PERSONAJES
CREATE TABLE IF NOT EXISTS `PERSONAJES` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `esEnemigo` tinyint(1) NOT NULL,
  `historia` text DEFAULT NULL,
  `iconoUrl` varchar(255) NOT NULL,
  `id_mundo` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_mundo` (`id_mundo`),
  CONSTRAINT `PERSONAJES_ibfk_1` FOREIGN KEY (`id_mundo`) REFERENCES `MUNDOS` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando estructura para tabla coltcap_bloodybreakers.ESCENARIOS
CREATE TABLE IF NOT EXISTS `ESCENARIOS` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `id_mundo` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_mundo` (`id_mundo`),
  CONSTRAINT `ESCENARIOS_ibfk_1` FOREIGN KEY (`id_mundo`) REFERENCES `MUNDOS` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Volcando estructura para tabla coltcap_bloodybreakers.PERSONAJE_HABILIDAD
CREATE TABLE IF NOT EXISTS `PERSONAJE_HABILIDAD` (
  `id_personaje` int(11) NOT NULL,
  `id_habilidad` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_personaje`,`id_habilidad`),
  KEY `id_habilidad` (`id_habilidad`),
  CONSTRAINT `PERSONAJE_HABILIDAD_ibfk_1` FOREIGN KEY (`id_personaje`) REFERENCES `PERSONAJES` (`id`) ON DELETE CASCADE,
  CONSTRAINT `PERSONAJE_HABILIDAD_ibfk_2` FOREIGN KEY (`id_habilidad`) REFERENCES `HABILIDADES` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



-- Volcando estructura para tabla coltcap_bloodybreakers.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rol` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rol` (`rol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



-- Volcando estructura para tabla coltcap_bloodybreakers.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `rol_id` (`rol_id`),
  CONSTRAINT `USUARIOS_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla coltcap_bloodybreakers.MUNDOS: ~1 rows (aproximadamente)
INSERT INTO `MUNDOS` (`id`, `nombre`, `historia`, `createdAt`, `updatedAt`) VALUES
	(6, 'Unknown', 'Año 2XXX. La metrópolis ha caído. La delincuencia, las sucesivas enfermedades que asolan la\r\nciudad y los numerosos golpes de estado obligaron a las fuerzas políticas a instaurar la Ley\r\nMarcial de forma indefinida. A este evento se le\r\nconoce como EL SUCESO. El nombre que antaño\r\npertenecía a la ciudad se ha disuelto con el tiempo, en su lugar ahora es conocida como “BLOOD\r\nCITY”.\r\nMarginados, pandilleros, dementes y engendros\r\nson los que ahora conforman su población.\r\nEntre sus habitantes se han ido formando una\r\nespecie de gremios conocidos como SECTAS.\r\nCuatro son las sectas más notables, entre las que\r\ntenemos a:\r\nTHE UNKNOWNS: los seres que conforman este\r\ngrupo tienen una peculiaridad. No pertenecen a\r\nla raza humana. Híbridos, mutantes, entes interdimensionales y demás calaña son los que pertenecen a este clan. Forman parte de lo que se\r\nconoce popularmente como “Leyendas urbanas”,\r\ny han decidido unirse para luchar por sus derechos sobre su propia existencia. “¡SOMOS UNOS\r\nCIUDADANOS MÁS Y TENEMOS DERECHO A\r\nEXISTIR!”\r\nCHIPBREAKERS: pandilleros, skaters, grafiteros.\r\nGente que se crió y creció en las calles. Su escenario de aprendizaje se ha convertido en un\r\ncampo de guerra y se han negado a abandonarlo. Ahora estos habitantes callejeros son guerreros, han aprendido el arte de la lucha en el mismo\r\nlugar en el que aprendieron a pintar las paredes.\r\n“¡NACIMOS Y MORIREMOS EN LA CALLE!”\r\nNU.75: la decadencia de la metrópolis les sirvió\r\ncomo excusa para ser lo que siempre quisieron\r\nser: MÁQUINAS DE MATAR.\r\nAntaño la modificación humana no sobrepasaba\r\nde una intervención para modificar la apariencia\r\nestética. La chispa que inició toda esta orgía de\r\naceite y engranajes comenzó por un solo hombre. Un hombre con el suficiente poder para llevar\r\na cabo la implementación de chips en el cerebro\r\nhumano. La unión del hombre y la máquina se\r\nhizo real.\r\nTras El Suceso, estas personas decidieron no\r\ndepender de ningún objeto que no estuviera integrado en su propio cuerpo. El pánico a una\r\nmuerte inesperada les obligó a tener siempre\r\ndesenvainada la espada y desenfundado el revólver, por lo que unirlos a su propio cuerpo fue\r\nsu mejor opción. “VIVIR ES LO MÁS PARECIDO\r\nA PERMANECER CONSTANTEMENTE EN EL FILO\r\nDE UNA ESPADA.”\r\nTHE FEARLESS WARRIORS OF THE UNIVERSE:\r\nque su nombre no os engañe, son los mayores\r\npringados de la ciudad. Un atajo de inútiles que,\r\nal enterarse de la situación, eligieron el mejor de\r\nlos sistemas: encerrarse en sus casas esperando una salvación. Presos en sus propios hogares,\r\nestos seres se han alimentado de lo único que\r\nles quedaba en la vida, sus hobbies. Ésto les ha\r\ninducido en una especie de trance que les impide\r\ndiferenciar entre la ficción y la realidad. Son los\r\nhéroes de sus propias historias y solo la muerte\r\nles impedirá llevar a cabo su objetivo: salvar al\r\nmundo de las garras del mal.\r\n“EL MUNDO ES COMO EL VÁTER DE UN BAR DE\r\nMALA MUERTE, SOLO HAY MIERDA Y NOSOTROS SOMOS SUS DESATASCADORES.”', '2025-05-14 18:48:57', '2025-05-14 18:48:57');




-- Volcando datos para la tabla coltcap_bloodybreakers.HABILIDADES: ~4 rows (aproximadamente)
INSERT INTO `HABILIDADES` (`id`, `nombre`, `dano`, `iconoUrl`, `createdAt`, `updatedAt`) VALUES
	(6, 'Bola de Fuego', 50, 'https://cdn-icons-png.freepik.com/256/7446/7446050.png?semt=ais_hybrid', '2025-05-14 18:53:11', '2025-05-14 18:53:11'),
	(7, 'Rayo Congelante', 40, 'https://cdn-icons-png.freepik.com/256/4994/4994594.png?semt=ais_hybrid', '2025-05-14 18:53:11', '2025-05-14 18:53:11'),
	(8, 'Hackeo Rápido', 30, 'https://cdn-icons-png.freepik.com/256/4029/4029242.png?semt=ais_hybrid', '2025-05-14 18:53:11', '2025-05-14 18:53:11'),
	(9, 'Cañón de Plasma', 60, 'https://cdn-icons-png.freepik.com/256/3521/3521183.png?semt=ais_hybrid', '2025-05-14 18:53:11', '2025-05-14 18:53:11');

-- Volcando datos para la tabla coltcap_bloodybreakers.PERSONAJES: ~7 rows (aproximadamente)
INSERT INTO `PERSONAJES` (`id`, `nombre`, `esEnemigo`, `historia`, `iconoUrl`, `id_mundo`, `createdAt`, `updatedAt`) VALUES
	(25, '404', 0, 'Las referencias que sirvieron para dar cuerpo a\r\n404 han sido diversos PERSONAJES “peculiares” de\r\njuegos de lucha y el casco de Deadmau5... exactamente, me gusta ese casco por sus formas\r\nsencillas y geométricas, por lo que me pareció\r\ninteresante para este personaje.\r\nEn cuanto al resto de referencias, los PERSONAJES elegidos comparten una característica en\r\ncomún: conforman el grupo de los PERSONAJES\r\nraros.\r\nPersonajes que tienen un carácter extraño y que\r\nactúan diferente al resto de PERSONAJES de sus\r\nrespectivos juegos.', 'https://i.imgur.com/FcLhfCL.png', 6, '2025-05-14 19:02:31', '2025-05-14 19:02:31'),
	(26, 'Backpack_O ', 0, 'Las referencias que sirvieron para dar cuerpo a\r\nBACKPACKO fue una serie de desafortunadas\r\nideas que acabaron desembocando en el engendro que acabó resultando.\r\nLa fusión entre un aficionado a los cómics (concretamente a las Tortugas Ninja), a las “idols”, a\r\nlas armas y a las mochilas grandes dio como resultado a un hombrecillo delgaducho y disperso\r\npero muy embravecido, por lo que ha decidido\r\nmeterse en el campo de batalla armado con absolutamente todas las réplicas de armas de las\r\nque dispone.', 'https://i.imgur.com/I6ZU8Wc.png', 6, '2025-05-14 19:02:31', '2025-05-14 19:02:31'),
	(27, 'Tenshi', 0, 'Las referencias que sirvieron para dar cuerpo a\r\nTENSHI han sido por un lado, las vestimentas\r\npropias del Japón feudal como figuras características de esa época tales como los “shinobis”.\r\nPor el otro lado me he inspirado en ropas actuales\r\nque pretenden emular un futuro cibernético que\r\nme recuerda a el concepto estilístico conocido\r\ncomo Neo-Tokio.\r\nLa figura situada a la derecha es la del protagonista del videojuego Sekiro: Shadows Die Twice. El\r\nmotivo que mueve a este personaje es la misma\r\nque la de Tenshi: la venganza. Por esta razón me\r\nsirve de inspiración directa para desarrollarlo.', 'https://i.imgur.com/GD6De2l.png', 6, '2025-05-14 19:02:31', '2025-05-14 19:02:31'),
	(28, 'Jessie “RAYGUN”', 0, 'Las referencias que sirvieron para dar cuerpo a\r\nJESSIE “RAYGUN” fueron por un lado, PERSONAJES\r\nmusculados y poderosos de videojuegos que, a\r\npoder ser, portaran un “bláster” o arma a distancia implementada en sus brazos.\r\nPor otro lado tenemos a PERSONAJES icónicos del\r\ncine de los años 80 tales como Ellen Ripley, protagonista de la saga Alien y Sarah Connor, protagonista de la saga Terminator.\r\nLa intención con estas referencias fue la de crear\r\nun personaje que evocara energía y poder.', 'https://i.imgur.com/UiEvuLa.png', 6, '2025-05-14 19:02:31', '2025-05-14 19:02:31'),
	(29, 'Hook', 0, 'Las referencias que sirvieron de apoyo a la hora\r\nde dar a luz a este personaje son bastante diferentes entre sí. Por un lado tenemos a PERSONAJES\r\nde videojuegos tales como los “pirados” de Borderlands e Illidan de World of Warcraft, por otro\r\nlado tenemos a PERSONAJES ficticios del cine tales como el Capitán Garfio de la película Hook y\r\na Mad Max, de la famosa saga de películas con\r\nsu mismo nombre. Por último tenemos a referentes del mundo real tales como los punks (en\r\neste caso he usado de imagen representativa al\r\ngrupo The Casualities), y a la tribu caníbal Asaro,\r\nlos cuales se caracterizan por portar una máscara de barro.', 'https://i.imgur.com/nARNUc3.png', 6, '2025-05-14 19:02:31', '2025-05-14 19:02:31'),
	(30, 'Finn', 0, 'Este último personaje salió realmente casi sin\r\npretenderlo. Los referentes que sirvieron para\r\ncaracterizar a este personaje son un cúmulo de\r\ngustos personales que hicieron tomar forma a\r\neste personaje.\r\nAl contrario que los demás, Finn no fue planificado. Fue el resultado indirecto de una serie de bocetos sin mayor objetivo que el de calentar para\r\nponerme a trabajar en este proyecto.\r\nPara este personaje los referentes han sido PERSONAJES de cine, de series de animación, de videojuegos y, por último pero no menos importante,\r\nunas “Jordan”, que quedan bastante “fardonas”.', 'https://i.imgur.com/BNjKkIE.png', 6, '2025-05-14 19:02:31', '2025-05-14 19:02:31'),
	(31, 'Carnival', 1, 'Las referencias que sirvieron para dar cuerpo a\r\nCARNIVAL son el resultado de la fusión de 2 conceptos: una planta y un pájaro.\r\nPara formar la idea de la planta utilicé como inspiraciones desde plantas carnívoras reales y ficticias hasta el conocido huevo del que nace la\r\ncriatura de Alien.\r\nPara formar la idea del pájaro decidí usar referencias que considero bastante elegantes y atractivas como los flamencos y los tucanes. Además\r\nutilicé la figura de Punpun jóven, del manga Oyasumi Punpun para simplificar las formas de los\r\npájaros con el objetivo de que fueran simples y\r\n“cucos”.', 'https://i.imgur.com/GAwhMEl.jpeg', 6, '2025-05-14 19:02:31', '2025-05-14 19:02:31');


-- Volcando datos para la tabla coltcap_bloodybreakers.ESCENARIOS: ~2 rows (aproximadamente)
INSERT INTO `ESCENARIOS` (`id`, `nombre`, `id_mundo`, `createdAt`, `updatedAt`) VALUES
	(7, 'Alcantarillado', 6, '2025-05-14 18:51:16', '2025-05-14 18:51:16'),
	(8, 'Callejones', 6, '2025-05-14 18:51:16', '2025-05-14 18:51:16');

-- Volcando datos para la tabla coltcap_bloodybreakers.roles: ~3 rows (aproximadamente)
INSERT INTO `roles` (`id`, `rol`) VALUES
	(1, 'admin'),
	(2, 'editor'),
	(3, 'jugador');

-- Volcando datos para la tabla coltcap_bloodybreakers.usuarios: ~10 rows (aproximadamente)
INSERT INTO `usuarios` (`id`, `email`, `contrasena`, `rol_id`, `createdAt`, `updatedAt`) VALUES
	(1, 'admin@juego.com', '$2b$10$adminhashdummy', 1, '2025-05-05 18:29:53', '2025-05-05 18:29:53'),
	(2, 'editor@juego.com', '$2b$10$editorhashdummy', 2, '2025-05-05 18:29:53', '2025-05-05 18:29:53'),
	(3, 'jugador@juego.com', '$2b$10$jugadorhashdummy', 3, '2025-05-05 18:29:53', '2025-05-05 18:29:53'),
	(5, 'prueba@jugador.com', '$2b$10$jYAsKFrsusGtKVvs58vlC.U7v62Q/wgj46IjToFwlICa4cfb2UjBy', 1, '2025-05-05 18:36:30', '2025-05-05 18:45:12'),
	(6, 'prueba3@hotmail.com', '$2b$10$Xfa576b0rt4XAe631Flzfu2skSpzH2ORr6A2j8b0JpGoYCs8Sv3yO', 3, '2025-05-06 18:02:41', '2025-05-06 18:02:41'),
	(7, 'loquesea@gmail.com', '$2b$10$Ct5ssQe5sZaP7.q2OiIDY.Aai4F/uc.u925nzdonCFsYpK7o7KPXm', 3, '2025-05-09 06:40:47', '2025-05-09 06:40:47'),
	(8, 'paco@example.com', '$2b$10$noPPIUGVp.0qegV2RX0CieMUnyiJrO7y6yO73Tae0kJWtw6LnvDga', 3, '2025-05-12 11:45:53', '2025-05-12 11:45:53'),
	(9, 'dwqokdokwq@qwduiwqn', '$2b$10$fiG/yflAb0UOZOJs0QzI5OV20QDZeyWgHVmVT3S8ohE50F4JhMZiy', 3, '2025-05-13 20:05:24', '2025-05-13 20:05:24'),
	(10, 'dnoas@wqnid', '$2b$10$Rg.XYjldzugxvgvwus3EL.CHLEDM46IqTy4gBSshIPF8OpPNNwAkG', 3, '2025-05-13 20:05:43', '2025-05-13 20:05:43'),
	(11, 'asd@asd', '$2b$10$xeeG.ujFnyvodEW/Yfn.b.et/zTXPdwQVnmG.7hWI8SjOPRnqxanK', 3, '2025-05-13 20:16:53', '2025-05-13 20:16:53');

-- Volcando datos para la tabla coltcap_bloodybreakers.PERSONAJE_HABILIDAD: ~4 rows (aproximadamente)
INSERT INTO `PERSONAJE_HABILIDAD` (`id_personaje`, `id_habilidad`, `createdAt`, `updatedAt`) VALUES
	(25, 8, '2025-05-14 19:05:38', '2025-05-14 19:05:38'),
	(28, 9, '2025-05-14 19:05:38', '2025-05-14 19:05:38'),
	(30, 7, '2025-05-14 19:05:38', '2025-05-14 19:05:38'),
	(31, 6, '2025-05-14 19:05:38', '2025-05-14 19:05:38');


-- Volcando datos para la tabla coltcap_bloodybreakers.IMAGENES: ~38 rows (aproximadamente)
INSERT INTO `IMAGENES` (`id`, `url`, `tipo_entidad`, `id_entidad`, `nombre`, `descripcion`, `createdAt`, `updatedAt`) VALUES
	(12, 'https://i.imgur.com/zzgOqR0.jpeg', 'ESCENARIO', 7, 'Alcantarillado - Color', '', '2025-05-14 19:16:46', '2025-05-14 19:16:46'),
	(13, 'https://i.imgur.com/G10CSLH.png', 'ESCENARIO', 7, 'Alcantarillado - Linea', '', '2025-05-14 19:16:46', '2025-05-14 19:16:46'),
	(14, 'https://i.imgur.com/JVlcWSb.jpeg', 'ESCENARIO', 8, 'Callejones - Color', '', '2025-05-14 19:16:46', '2025-05-14 19:16:46'),
	(15, 'https://i.imgur.com/58QXB3u.png', 'ESCENARIO', 8, 'Callejones - Linea', '', '2025-05-14 19:16:46', '2025-05-14 19:16:46'),
	(16, 'https://i.imgur.com/58QXB3u.png', 'MUNDO', 6, 'Mundo Bloody Breaker PERSONAJES', 'Diseño de portada', '2025-05-14 19:16:46', '2025-05-14 19:16:46'),
	(17, 'https://i.imgur.com/rdxAdvH.jpeg', 'PERSONAJE', 25, '404 - Rediseño', '', '2025-05-14 19:16:46', '2025-05-14 19:18:00'),
	(18, 'https://i.imgur.com/1NkjIbU.jpeg', 'PERSONAJE', 26, 'BackpacO - Rediseño', '', '2025-05-14 19:17:44', '2025-05-14 19:17:44'),
	(19, 'https://i.imgur.com/uSx8Vub.jpeg', 'PERSONAJE', 30, 'Finn - Rediseño', '', '2025-05-14 19:17:44', '2025-05-14 19:17:44'),
	(20, 'https://i.imgur.com/flKshW1.jpeg', 'PERSONAJE', 29, 'Hook - Rediseño', '', '2025-05-14 19:17:44', '2025-05-14 19:17:44'),
	(21, 'https://i.imgur.com/ZcZTRtF.jpeg', 'PERSONAJE', 28, 'Jessie - Rediseño', '', '2025-05-14 19:17:44', '2025-05-14 19:17:44'),
	(22, 'https://i.imgur.com/jmoZWkn.jpeg', 'PERSONAJE', 27, 'Tenshi - Rediseño', '', '2025-05-14 19:17:44', '2025-05-14 19:17:44'),
	(23, 'https://i.imgur.com/Aj7yxq5.jpeg', 'EXTRAS', 0, '404 - cara', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(24, 'https://i.imgur.com/kgHZUPG.png', 'EXTRAS', 0, '404 - Desarrollo', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(25, 'https://i.imgur.com/TMOhERv.jpeg', 'EXTRAS', 0, '404 - expresiones', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(26, 'https://i.imgur.com/Aa4bu1t.jpeg', 'EXTRAS', 0, '404 - morfología', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(27, 'https://i.imgur.com/8ix1dYQ.png', 'EXTRAS', 0, '404 - turn arround', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(28, 'https://i.imgur.com/zZlA0Xv.jpeg', 'EXTRAS', 0, 'Backpack_O - cara', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(29, 'https://i.imgur.com/FK4EQzr.jpeg', 'EXTRAS', 0, 'Backpack_O - cuerpo', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(30, 'https://i.imgur.com/U0EYX5q.jpeg', 'EXTRAS', 0, 'Backpack_O - expresiones color', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(31, 'https://i.imgur.com/WJ46uHh.jpeg', 'EXTRAS', 0, 'Backpack_O - morfología', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(32, 'https://i.imgur.com/Oc3UXJn.jpeg', 'EXTRAS', 0, 'Backpack_O - expresiones', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(33, 'https://i.imgur.com/sec9kdw.png', 'EXTRAS', 0, 'Concepto Finn', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(34, 'https://i.imgur.com/SaMHLQm.jpeg', 'EXTRAS', 0, 'Hook - Desarrollo', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(35, 'https://i.imgur.com/GIGgZqG.jpeg', 'EXTRAS', 0, 'Jessie Raygun - cara', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(36, 'https://i.imgur.com/86ciGPs.jpeg', 'EXTRAS', 0, 'Jessie Raygun - cuerpo', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(37, 'https://i.imgur.com/fYmXv3D.jpeg', 'EXTRAS', 0, 'Jessie Raygun - expresiones b&n', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(38, 'https://i.imgur.com/7kwWzFQ.jpeg', 'EXTRAS', 0, 'Jessie Raygun - expresiones', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(39, 'https://i.imgur.com/g856dCp.png', 'EXTRAS', 0, 'Tenshi - Desarrollo', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(40, 'https://i.imgur.com/xQTLu7c.jpeg', 'EXTRAS', 0, 'Tenshi - expresiones color', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(41, 'https://i.imgur.com/XquC8RG.jpeg', 'EXTRAS', 0, 'PERSONAJES - Alturas - Libro de arte', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(42, 'https://i.imgur.com/uWjhBGS.jpeg', 'EXTRAS', 0, 'PERSONAJES - Alturas', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(43, 'https://i.imgur.com/IQQJ0KP.jpeg', 'PERSONAJE', 31, 'Carnival - acciones', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(44, 'https://i.imgur.com/GAwhMEl.jpeg', 'PERSONAJE', 31, 'Carnival - expresiones faciales', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(45, 'https://i.imgur.com/0gyMjEp.jpeg', 'EXTRAS', 0, 'Selector de PERSONAJES', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(46, 'https://i.imgur.com/NjRoebt.png', 'EXTRAS', 0, '1. Concepto inicial', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(47, 'https://i.imgur.com/NykSmai.jpeg', 'EXTRAS', 0, '2. Conceptos', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(48, 'https://i.imgur.com/ZulzECP.jpeg', 'EXTRAS', 0, '3. Escena 1', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40'),
	(49, 'https://i.imgur.com/c1N5Fet.jpeg', 'EXTRAS', 0, '3. Escena 2', '', '2025-05-14 19:28:40', '2025-05-14 19:28:40');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
