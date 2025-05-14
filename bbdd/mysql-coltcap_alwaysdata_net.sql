-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql-coltcap.alwaysdata.net
-- Tiempo de generación: 14-05-2025 a las 18:11:15
-- Versión del servidor: 10.11.11-MariaDB
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `coltcap_bloodybreakers`
--
CREATE DATABASE IF NOT EXISTS `coltcap_bloodybreakers` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `coltcap_bloodybreakers`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ESCENARIOS`
--

CREATE TABLE `ESCENARIOS` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `id_mundo` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ESCENARIOS`
--

INSERT INTO `ESCENARIOS` (`id`, `nombre`, `id_mundo`, `createdAt`, `updatedAt`) VALUES
(3, 'Ciudad Neón', 2, '2025-05-05 16:48:16', '2025-05-05 16:48:16'),
(5, 'Obelix', 2, '2025-05-07 16:09:53', '2025-05-07 16:09:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `HABILIDADES`
--

CREATE TABLE `HABILIDADES` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `dano` int(11) NOT NULL,
  `iconoUrl` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `HABILIDADES`
--

INSERT INTO `HABILIDADES` (`id`, `nombre`, `dano`, `iconoUrl`, `createdAt`, `updatedAt`) VALUES
(1, 'Bola de Fuego', 50, 'https://cdn-icons-png.freepik.com/256/7446/7446050.png?semt=ais_hybrid', '2025-05-05 16:48:16', '2025-05-05 16:48:16'),
(2, 'Rayo Congelante', 40, 'https://cdn-icons-png.freepik.com/256/4994/4994594.png?semt=ais_hybrid', '2025-05-05 16:48:16', '2025-05-05 16:48:16'),
(3, 'Hackeo Rápido', 30, 'https://cdn-icons-png.freepik.com/256/4029/4029242.png?semt=ais_hybrid', '2025-05-05 16:48:16', '2025-05-05 16:48:16'),
(4, 'Cañón de Plasma', 60, 'https://cdn-icons-png.freepik.com/256/3521/3521183.png?semt=ais_hybrid', '2025-05-05 16:48:16', '2025-05-05 16:48:16'),
(5, 'Gladiator', 21, 'https://i.imgur.com/3w7HXvZ.jpeg', '2025-05-06 19:48:30', '2025-05-07 20:03:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `IMAGENES`
--

CREATE TABLE `IMAGENES` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `tipo_entidad` enum('MUNDO','ESCENARIO','PERSONAJE','HABILIDAD','EXTRAS') NOT NULL,
  `id_entidad` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `IMAGENES`
--

INSERT INTO `IMAGENES` (`id`, `url`, `tipo_entidad`, `id_entidad`, `nombre`, `descripcion`, `createdAt`, `updatedAt`) VALUES
(1, 'https://img.freepik.com/vector-gratis/plantilla-dibujos-animados-planeta-tierra-espacio_1284-38161.jpg', 'MUNDO', 1, 'Portada Mundo Fantástico', 'Imagen de portada del mundo lleno de magia.', '2025-05-05 16:48:16', '2025-05-05 16:48:16'),
(2, 'https://img.freepik.com/foto-gratis/paisaje-nocturno-magico-luces-brillantes_23-2150203061.jpg', 'ESCENARIO', 1, 'Bosque Encantado', 'Imagen representativa del escenario Bosque Encantado.', '2025-05-05 16:48:16', '2025-05-05 16:48:16'),
(3, 'https://img.freepik.com/vector-gratis/retrato-bella-elfa-sonriente_1196-884.jpg', 'PERSONAJE', 1, 'Retrato de Aria', 'Retrato oficial de Aria la Hechicera.', '2025-05-05 16:48:16', '2025-05-05 16:48:16'),
(4, 'https://i.imgur.com/XquC8RG.jpeg', 'EXTRAS', 0, 'Banner Altura personajes', NULL, '2025-05-05 16:48:16', '2025-05-05 16:48:16'),
(5, 'https://i.imgur.com/tZE1nTQ.jpeg', 'EXTRAS', 0, 'Logo del juego', 'El logo oficial del juego', '2025-05-07 16:44:32', '2025-05-07 16:44:32'),
(7, 'https://i.imgur.com/tZE1nTQ.jpeg', 'EXTRAS', 0, 'prueba descripcion es null', NULL, '2025-05-07 16:45:44', '2025-05-07 16:45:44'),
(8, 'https://i.imgur.com/XquC8RG.jpeg', 'EXTRAS', 0, 'qwdq', '', '2025-05-07 16:53:58', '2025-05-07 16:53:58'),
(9, 'https://i.imgur.com/6AAfKoc.jpeg', 'MUNDO', 5, 'OK', 'OK', '2025-05-07 16:55:17', '2025-05-07 20:27:43'),
(10, 'https://i.imgur.com/gSNP7WZ.jpeg', 'EXTRAS', 0, 'Jackie chan xD', 'No es jackie chan, solo soy racista', '2025-05-07 16:59:12', '2025-05-08 16:43:37'),
(11, 'https://i.imgur.com/5CKCzr6.jpeg', 'MUNDO', 2, 'SANODEQWNO', 'qwdwqdwqwq', '2025-05-07 17:00:48', '2025-05-07 17:00:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `MUNDOS`
--

CREATE TABLE `MUNDOS` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `historia` text DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `MUNDOS`
--

INSERT INTO `MUNDOS` (`id`, `nombre`, `historia`, `createdAt`, `updatedAt`) VALUES
(2, 'Mundo Cibernético', 'Un futuro dominado por inteligencia artificial y robots.', '2025-05-05 16:48:16', '2025-05-05 16:48:16'),
(5, 'omnitrix yo que se', 'erase una vez un cuento muy bonito o algo asi', '2025-05-07 18:31:12', '2025-05-07 18:31:12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PERSONAJES`
--

CREATE TABLE `PERSONAJES` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `esEnemigo` tinyint(1) NOT NULL,
  `historia` text DEFAULT NULL,
  `iconoUrl` varchar(255) NOT NULL,
  `id_mundo` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `PERSONAJES`
--

INSERT INTO `PERSONAJES` (`id`, `nombre`, `esEnemigo`, `historia`, `iconoUrl`, `id_mundo`, `createdAt`, `updatedAt`) VALUES
(5, 'Asterix', 1, 'Erase una vez muy vezosa', 'https://i.imgur.com/rdxAdvH_d.webp?maxwidth=1520&fidelity=grand', 2, '2025-05-06 19:21:30', '2025-05-06 19:21:30'),
(6, 'Obelix', 0, 'odwqnoidnowiq', 'https://i.imgur.com/flKshW1_d.webp?maxwidth=1520&fidelity=grand', 2, '2025-05-06 19:29:05', '2025-05-06 19:29:05'),
(8, 'Obelix', 0, 'dwqdq', 'https://i.imgur.com/ziKIRwp.jpeg', 2, '2025-05-08 17:38:19', '2025-05-08 17:38:19'),
(13, 'Aria la Hechicera', 0, 'Una poderosa maga que protege el bosque.', 'https://i.imgur.com/BNjKkIE.png', 2, '2025-05-08 17:47:06', '2025-05-11 21:19:56'),
(14, 'Lord Oscuro', 1, 'Un tirano que quiere dominar todos los mundos.', 'https://cdn-icons-png.freepik.com/256/1752/1752745.png?semt=ais_hybrid', 2, '2025-05-08 17:47:06', '2025-05-08 17:47:06'),
(15, 'Cyborg X-23', 1, 'Un experimento de IA fallido convertido en enemigo.', 'https://cdn-icons-png.freepik.com/256/1752/1752735.png?semt=ais_hybrid', 5, '2025-05-08 17:47:06', '2025-05-08 17:47:06'),
(16, 'Nova', 0, 'Una hacker rebelde que lucha contra el sistema.', 'https://cdn-icons-png.freepik.com/256/16025/16025466.png?semt=ais_hybrid', 5, '2025-05-08 17:47:06', '2025-05-08 17:47:06'),
(17, 'Aria la Hechicera', 0, 'Una poderosa maga que protege el bosque.', 'https://cdn-icons-png.freepik.com/256/1752/1752681.png?semt=ais_hybrid', 2, '2025-05-08 17:47:10', '2025-05-08 17:47:10'),
(18, 'Lord Oscuro', 1, 'Un tirano que quiere dominar todos los mundos.', 'https://cdn-icons-png.freepik.com/256/1752/1752745.png?semt=ais_hybrid', 2, '2025-05-08 17:47:10', '2025-05-08 17:47:10'),
(19, 'Cyborg X-23', 1, 'Un experimento de IA fallido convertido en enemigo.', 'https://cdn-icons-png.freepik.com/256/1752/1752735.png?semt=ais_hybrid', 5, '2025-05-08 17:47:10', '2025-05-08 17:47:10'),
(20, 'Nova', 0, 'Una hacker rebelde que lucha contra el sistema.', 'https://cdn-icons-png.freepik.com/256/16025/16025466.png?semt=ais_hybrid', 5, '2025-05-08 17:47:10', '2025-05-08 17:47:10'),
(21, 'Aria la Hechicera', 0, 'Una poderosa maga que protege el bosque.', 'https://cdn-icons-png.freepik.com/256/1752/1752681.png?semt=ais_hybrid', 2, '2025-05-08 17:47:13', '2025-05-08 17:47:13'),
(22, 'Lord Oscuro', 1, 'Un tirano que quiere dominar todos los mundos.', 'https://cdn-icons-png.freepik.com/256/1752/1752745.png?semt=ais_hybrid', 2, '2025-05-08 17:47:13', '2025-05-08 17:47:13'),
(23, 'Cyborg X-23', 1, 'Un experimento de IA fallido convertido en enemigo.', 'https://cdn-icons-png.freepik.com/256/1752/1752735.png?semt=ais_hybrid', 5, '2025-05-08 17:47:13', '2025-05-08 17:47:13'),
(24, 'Nova', 0, 'Una hacker rebelde que lucha contra el sistema.', 'https://cdn-icons-png.freepik.com/256/16025/16025466.png?semt=ais_hybrid', 5, '2025-05-08 17:47:13', '2025-05-08 17:47:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PERSONAJE_HABILIDAD`
--

CREATE TABLE `PERSONAJE_HABILIDAD` (
  `id_personaje` int(11) NOT NULL,
  `id_habilidad` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `PERSONAJE_HABILIDAD`
--

INSERT INTO `PERSONAJE_HABILIDAD` (`id_personaje`, `id_habilidad`, `createdAt`, `updatedAt`) VALUES
(6, 5, '2025-05-08 16:37:07', '2025-05-08 16:37:07'),
(8, 1, '2025-05-08 17:38:20', '2025-05-08 17:38:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ROLES`
--

CREATE TABLE `ROLES` (
  `id` int(11) NOT NULL,
  `rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ROLES`
--

INSERT INTO `ROLES` (`id`, `rol`) VALUES
(1, 'admin'),
(2, 'editor'),
(3, 'jugador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `USUARIOS`
--

CREATE TABLE `USUARIOS` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `USUARIOS`
--

INSERT INTO `USUARIOS` (`id`, `email`, `contrasena`, `rol_id`, `createdAt`, `updatedAt`) VALUES
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

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ESCENARIOS`
--
ALTER TABLE `ESCENARIOS`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_mundo` (`id_mundo`);

--
-- Indices de la tabla `HABILIDADES`
--
ALTER TABLE `HABILIDADES`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `IMAGENES`
--
ALTER TABLE `IMAGENES`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `MUNDOS`
--
ALTER TABLE `MUNDOS`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `PERSONAJES`
--
ALTER TABLE `PERSONAJES`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_mundo` (`id_mundo`);

--
-- Indices de la tabla `PERSONAJE_HABILIDAD`
--
ALTER TABLE `PERSONAJE_HABILIDAD`
  ADD PRIMARY KEY (`id_personaje`,`id_habilidad`),
  ADD KEY `id_habilidad` (`id_habilidad`);

--
-- Indices de la tabla `ROLES`
--
ALTER TABLE `ROLES`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rol` (`rol`);

--
-- Indices de la tabla `USUARIOS`
--
ALTER TABLE `USUARIOS`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `rol_id` (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ESCENARIOS`
--
ALTER TABLE `ESCENARIOS`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `HABILIDADES`
--
ALTER TABLE `HABILIDADES`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `IMAGENES`
--
ALTER TABLE `IMAGENES`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `MUNDOS`
--
ALTER TABLE `MUNDOS`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `PERSONAJES`
--
ALTER TABLE `PERSONAJES`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `ROLES`
--
ALTER TABLE `ROLES`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `USUARIOS`
--
ALTER TABLE `USUARIOS`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ESCENARIOS`
--
ALTER TABLE `ESCENARIOS`
  ADD CONSTRAINT `ESCENARIOS_ibfk_1` FOREIGN KEY (`id_mundo`) REFERENCES `MUNDOS` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `PERSONAJES`
--
ALTER TABLE `PERSONAJES`
  ADD CONSTRAINT `PERSONAJES_ibfk_1` FOREIGN KEY (`id_mundo`) REFERENCES `MUNDOS` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `PERSONAJE_HABILIDAD`
--
ALTER TABLE `PERSONAJE_HABILIDAD`
  ADD CONSTRAINT `PERSONAJE_HABILIDAD_ibfk_1` FOREIGN KEY (`id_personaje`) REFERENCES `PERSONAJES` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `PERSONAJE_HABILIDAD_ibfk_2` FOREIGN KEY (`id_habilidad`) REFERENCES `HABILIDADES` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `USUARIOS`
--
ALTER TABLE `USUARIOS`
  ADD CONSTRAINT `USUARIOS_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `ROLES` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
