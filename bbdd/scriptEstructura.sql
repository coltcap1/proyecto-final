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
