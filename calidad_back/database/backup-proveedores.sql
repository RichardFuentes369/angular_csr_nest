-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.11.11-MariaDB-0ubuntu0.24.04.2 - Ubuntu 24.04
-- SO del servidor:              debian-linux-gnu
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


-- Volcando estructura de base de datos para proveedores
DROP DATABASE IF EXISTS `proveedores`;
CREATE DATABASE IF NOT EXISTS `proveedores` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `proveedores`;

-- Volcando estructura para tabla proveedores.mod_mantenimiento_historico
DROP TABLE IF EXISTS `mod_mantenimiento_historico`;
CREATE TABLE IF NOT EXISTS `mod_mantenimiento_historico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `observacion` varchar(255) NOT NULL,
  `precio` int(11) NOT NULL,
  `recomendacion` varchar(255) NOT NULL,
  `orden_id` int(11) DEFAULT NULL,
  `proveedor_id` int(11) DEFAULT NULL,
  `fecha_creacion` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_962b7429182fe8c3fff3b2dea08` (`orden_id`),
  KEY `FK_b585cee8ba6cc1c616b045ccad5` (`proveedor_id`),
  CONSTRAINT `FK_962b7429182fe8c3fff3b2dea08` FOREIGN KEY (`orden_id`) REFERENCES `mod_mantenimiento_orden` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_b585cee8ba6cc1c616b045ccad5` FOREIGN KEY (`proveedor_id`) REFERENCES `mod_proveedores` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla proveedores.mod_mantenimiento_historico: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proveedores.mod_mantenimiento_orden
DROP TABLE IF EXISTS `mod_mantenimiento_orden`;
CREATE TABLE IF NOT EXISTS `mod_mantenimiento_orden` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `serial` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `precio` int(11) NOT NULL DEFAULT 0,
  `fecha_mantenimiento` int(11) NOT NULL,
  `fecha_creacion` int(11) NOT NULL,
  `fecha_actualizacion` int(11) DEFAULT NULL,
  `estado` enum('EnEspera','Iniciado','Pausado','Finalizado') NOT NULL DEFAULT 'EnEspera',
  `zona_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e0d5a2b365cda3b7c4841cc62fa` (`zona_id`),
  CONSTRAINT `FK_e0d5a2b365cda3b7c4841cc62fa` FOREIGN KEY (`zona_id`) REFERENCES `mod_zona_social` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla proveedores.mod_mantenimiento_orden: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proveedores.mod_permisos_modulo
DROP TABLE IF EXISTS `mod_permisos_modulo`;
CREATE TABLE IF NOT EXISTS `mod_permisos_modulo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_permiso` varchar(255) DEFAULT NULL,
  `modulo_padre_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_28bd06971f76c49399db2715d90` (`modulo_padre_id`),
  CONSTRAINT `FK_28bd06971f76c49399db2715d90` FOREIGN KEY (`modulo_padre_id`) REFERENCES `mod_permisos_modulo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla proveedores.mod_permisos_modulo: ~31 rows (aproximadamente)
INSERT INTO `mod_permisos_modulo` (`id`, `nombre_permiso`, `modulo_padre_id`) VALUES
	(1, 'usuarios', NULL),
	(2, 'administradores', 1),
	(3, 'finales', 1),
	(4, 'crear', 2),
	(5, 'editar', 2),
	(6, 'eliminar', 2),
	(7, 'ver', 2),
	(8, 'asignar_permisos', 2),
	(9, 'crear', 3),
	(10, 'editar', 3),
	(11, 'eliminar', 3),
	(12, 'ver', 3),
	(13, 'modulos', NULL),
	(14, 'ver', 13),
	(15, 'mantenimiento', NULL),
	(16, 'zona_comun', NULL),
	(17, 'proveedor', NULL),
	(18, 'crear', 16),
	(19, 'ver', 16),
	(20, 'editar', 16),
	(21, 'eliminar', 16),
	(22, 'crear', 17),
	(23, 'editar', 17),
	(24, 'ver', 17),
	(25, 'eliminar', 17),
	(36, 'ver', 15),
	(37, 'crear', 15),
	(38, 'editar', 15),
	(39, 'eliminar', 15),
	(40, 'historico', 15),
	(42, 'elimnar', 40);

-- Volcando estructura para tabla proveedores.mod_permisos_modulo_asignacion
DROP TABLE IF EXISTS `mod_permisos_modulo_asignacion`;
CREATE TABLE IF NOT EXISTS `mod_permisos_modulo_asignacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_permiso` varchar(255) DEFAULT NULL,
  `modulo_padre_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_6eb0af2f8e13274ad1819f4cfca` (`user_id`),
  CONSTRAINT `FK_6eb0af2f8e13274ad1819f4cfca` FOREIGN KEY (`user_id`) REFERENCES `mod_usuarios_admin` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla proveedores.mod_permisos_modulo_asignacion: ~31 rows (aproximadamente)
INSERT INTO `mod_permisos_modulo_asignacion` (`id`, `nombre_permiso`, `modulo_padre_id`, `user_id`) VALUES
	(1, 'usuarios', NULL, 1),
	(2, 'administradores', 1, 1),
	(3, 'finales', 1, 1),
	(4, 'crear', 2, 1),
	(5, 'editar', 2, 1),
	(6, 'eliminar', 2, 1),
	(7, 'ver', 2, 1),
	(8, 'asignar_permisos', 2, 1),
	(9, 'crear', 3, 1),
	(10, 'editar', 3, 1),
	(11, 'eliminar', 3, 1),
	(24, 'modulos', NULL, 1),
	(25, 'ver', 13, 1),
	(27, 'zona_comun', NULL, 1),
	(28, 'proveedor', NULL, 1),
	(31, 'ver', 3, 1),
	(37, 'ver', 16, 1),
	(38, 'editar', 16, 1),
	(39, 'eliminar', 16, 1),
	(40, 'crear', 17, 1),
	(41, 'editar', 17, 1),
	(42, 'ver', 17, 1),
	(43, 'eliminar', 17, 1),
	(44, 'crear', 16, 1),
	(56, 'mantenimiento', NULL, 1),
	(57, 'ver', 15, 1),
	(58, 'crear', 15, 1),
	(59, 'editar', 15, 1),
	(60, 'eliminar', 15, 1),
	(63, 'historico', 15, 1),
	(64, 'eliminar', 40, 1);

-- Volcando estructura para tabla proveedores.mod_proveedores
DROP TABLE IF EXISTS `mod_proveedores`;
CREATE TABLE IF NOT EXISTS `mod_proveedores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `razonSocial` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `estado` varchar(255) NOT NULL,
  `nit` varchar(255) NOT NULL,
  `fecha_actualizacion` int(11) DEFAULT NULL,
  `fecha_creacion` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_987a50a67b32001c1e1ec561f6` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla proveedores.mod_proveedores: ~13 rows (aproximadamente)
INSERT INTO `mod_proveedores` (`id`, `razonSocial`, `telefono`, `email`, `estado`, `nit`, `fecha_actualizacion`, `fecha_creacion`) VALUES
	(1, 'Pintores hermanos mario', '1111111111', 'mariopintores@gmail.com', 'activo', '1000000001-1', NULL, 1744511030),
	(2, 'Ladrillera 505', '1111111111', 'ladrillera_505@gmail.com', 'activo', '1000000002-1', NULL, 1744511030),
	(3, 'Plomeros la 57', '1111111111', 'plomeria_57@gmail.com', 'activo', '1000000003-1', NULL, 1744511030),
	(4, 'Rejas y rejitas', '1111111111', 'rrejitas96@gmail.com', 'activo', '1000000004-1', NULL, 1744511030),
	(5, 'Ferreteria 502', '1111111111', 'ferre_502@gmail.com', 'activo', '1000000005-1', NULL, 1744511030),
	(6, 'El milenio piscinas', '1111111111', 'administracion@piscinasmilenio.com', 'activo', '1000000006-1', NULL, 1744511030),
	(7, 'Filtros y empaques SAS', '1111111111', 'administracion@fye.com', 'activo', '1000000007-1', NULL, 1744511030),
	(8, 'Otis', '1111111111', 'administracion@otis.com', 'activo', '1000000008-1', NULL, 1744511030),
	(9, 'Tapetes la 33', '1111111111', 'administracion_tapiceria@tapetes33.com', 'activo', '1000000009-1', NULL, 1744511030),
	(10, 'Extintores bga Sa', '1111111111', 'gerencia@extintoresbga.com', 'activo', '1000000010-1', NULL, 1744511030),
	(11, 'Interno', '1111111111', 'interno@condominio.com', 'activo', '1000000000-1', NULL, 1744511030),
	(12, 'Mensajeria FullGas', '1111111111', 'mensajeria_fullgas@gmail.com', 'activo', '1000000011-1', NULL, 1744511030),
	(13, 'Mensajeria Jhonny Hernandes', '1111111111', 'mensajeria_johnnyhernandez@gmail.com', 'activo', '1000000012-1', NULL, 1744511030),
	(15, 'Refresh-Air', '1111111111', 'administracion@refreshair.com', 'activo', '1000000013-1', NULL, 1744511030);

-- Volcando estructura para tabla proveedores.mod_usuarios_admin
DROP TABLE IF EXISTS `mod_usuarios_admin`;
CREATE TABLE IF NOT EXISTS `mod_usuarios_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_c885318c449a37e806a7f87607` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla proveedores.mod_usuarios_admin: ~2 rows (aproximadamente)
INSERT INTO `mod_usuarios_admin` (`id`, `firstName`, `lastName`, `email`, `password`, `isActive`) VALUES
	(1, 'AdminName1', 'AdminLastname1', 'admin1@correo.com', 'Qwerty9601', 1),
	(2, 'AdminName2', 'AdminLastname2', 'admin2@correo.com', 'Qwerty9601', 1);

-- Volcando estructura para tabla proveedores.mod_usuarios_user
DROP TABLE IF EXISTS `mod_usuarios_user`;
CREATE TABLE IF NOT EXISTS `mod_usuarios_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_129e1f78d9bf43c04689f16cf8` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla proveedores.mod_usuarios_user: ~2 rows (aproximadamente)
INSERT INTO `mod_usuarios_user` (`id`, `firstName`, `lastName`, `email`, `password`, `isActive`) VALUES
	(1, 'Usuario1', 'Gates', 'user1@gmail.com', 'Qwerty9601', 1),
	(2, 'Usuario2', 'Gates', 'user2@gmail.com', 'Qwerty9601', 1);

-- Volcando estructura para tabla proveedores.mod_zona_social
DROP TABLE IF EXISTS `mod_zona_social`;
CREATE TABLE IF NOT EXISTS `mod_zona_social` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `ubicacion` varchar(255) NOT NULL,
  `fecha_actualizacion` int(11) DEFAULT NULL,
  `fecha_creacion` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla proveedores.mod_zona_social: ~47 rows (aproximadamente)
INSERT INTO `mod_zona_social` (`id`, `nombre`, `descripcion`, `ubicacion`, `fecha_actualizacion`, `fecha_creacion`) VALUES
	(1, 'Portería', 'Principal', 'Calle 12 no 12 - 25', NULL, 1744511030),
	(2, 'Portería', 'Secundaria', 'Calle 11 no 12 - 55', NULL, 1744511030),
	(3, 'Obvi', 'Portería principal', 'Entrada portería principal', NULL, 1744511030),
	(4, 'Piscina', 'Adultos', 'Primera planta', NULL, 1744511030),
	(5, 'Piscina', 'Niños', 'Primera planta', NULL, 1744511030),
	(6, 'Parque', 'Juegos', 'Primera planta', NULL, 1744511030),
	(7, 'Edificio A', 'Sotano 1', 'Edificio A', NULL, 1744511030),
	(8, 'Edificio A', 'Sotano 2', 'Edificio A', NULL, 1744511030),
	(9, 'Edificio A', 'Sotano 3', 'Edificio A', NULL, 1744511030),
	(10, 'Edificio A', 'Piso 1', 'Edificio A', NULL, 1744511030),
	(11, 'Edificio A', 'Piso 2', 'Edificio A', NULL, 1744511030),
	(12, 'Edificio A', 'Piso 3', 'Edificio A', NULL, 1744511030),
	(13, 'Edificio A', 'Piso 4', 'Edificio A', NULL, 1744511030),
	(14, 'Edificio A', 'Piso 5', 'Edificio A', NULL, 1744511030),
	(15, 'Edificio A', 'Piso 6', 'Edificio A', NULL, 1744511030),
	(16, 'Edificio A', 'Piso 7', 'Edificio A', NULL, 1744511030),
	(17, 'Edificio A', 'Piso 8', 'Edificio A', NULL, 1744511030),
	(18, 'Edificio A', 'Piso 9', 'Edificio A', NULL, 1744511030),
	(19, 'Edificio A', 'Piso 10', 'Edificio A', NULL, 1744511030),
	(20, 'Edificio A', 'Piso 11', 'Edificio A', NULL, 1744511030),
	(21, 'Edificio A', 'Piso 12', 'Edificio A', NULL, 1744511030),
	(22, 'Edificio A', 'Piso 13', 'Edificio A', NULL, 1744511030),
	(23, 'Edificio A', 'Piso 14', 'Edificio A', NULL, 1744511030),
	(24, 'Edificio A', 'Piso 15', 'Edificio A', NULL, 1744511030),
	(25, 'Edificio A', 'Terraza', 'Edificio A', NULL, 1744511030),
	(26, 'Edificio B', 'Sotano 1', 'Edificio B', NULL, 1744511030),
	(27, 'Edificio B', 'Sotano 2', 'Edificio B', NULL, 1744511030),
	(28, 'Edificio B', 'Sotano 3', 'Edificio B', NULL, 1744511030),
	(29, 'Edificio B', 'Piso 1', 'Edificio B', NULL, 1744511030),
	(30, 'Edificio B', 'Piso 2', 'Edificio B', NULL, 1744511030),
	(31, 'Edificio B', 'Piso 3', 'Edificio B', NULL, 1744511030),
	(32, 'Edificio B', 'Piso 4', 'Edificio B', NULL, 1744511030),
	(33, 'Edificio B', 'Piso 5', 'Edificio B', NULL, 1744511030),
	(34, 'Edificio B', 'Piso 6', 'Edificio B', NULL, 1744511030),
	(35, 'Edificio B', 'Piso 7', 'Edificio B', NULL, 1744511030),
	(36, 'Edificio B', 'Piso 8', 'Edificio B', NULL, 1744511030),
	(37, 'Edificio B', 'Piso 9', 'Edificio B', NULL, 1744511030),
	(38, 'Edificio B', 'Piso 10', 'Edificio B', NULL, 1744511030),
	(39, 'Edificio B', 'Piso 11', 'Edificio B', NULL, 1744511030),
	(40, 'Edificio B', 'Piso 12', 'Edificio B', NULL, 1744511030),
	(41, 'Edificio B', 'Piso 13', 'Edificio B', NULL, 1744511030),
	(42, 'Edificio B', 'Piso 14', 'Edificio B', NULL, 1744511030),
	(43, 'Edificio B', 'Piso 15', 'Edificio B', NULL, 1744511030),
	(44, 'Edificio B', 'Terraza', 'Edificio B', NULL, 1744511030),
	(45, 'Edificio B', 'Ascensor', 'Edificio B', NULL, 1744511030),
	(46, 'Edificio A', 'Ascensor', 'Edificio A', NULL, 1744511030),
	(47, 'Gimnasio', 'Fit', 'Primera planta', NULL, 1744511030);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
