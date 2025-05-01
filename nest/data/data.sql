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


-- Volcando estructura de base de datos para core_csr
CREATE DATABASE IF NOT EXISTS `core_csr` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `core_csr`;

-- Volcando estructura para tabla core_csr.mod_permisos_modulo
CREATE TABLE IF NOT EXISTS `mod_permisos_modulo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_permiso` varchar(255) DEFAULT NULL,
  `modulo_padre_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_28bd06971f76c49399db2715d90` (`modulo_padre_id`),
  CONSTRAINT `FK_28bd06971f76c49399db2715d90` FOREIGN KEY (`modulo_padre_id`) REFERENCES `mod_permisos_modulo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla core_csr.mod_permisos_modulo: ~14 rows (aproximadamente)
INSERT INTO `mod_permisos_modulo` (`id`, `nombre_permiso`, `modulo_padre_id`) VALUES
	(1, 'usuarios', NULL),
	(2, 'administradores', 1),
	(3, 'crear', 2),
	(4, 'ver', 2),
	(5, 'editar', 2),
	(6, 'eliminar', 2),
	(7, 'asignar_permisos', 2),
	(8, 'finales', 1),
	(9, 'ver', 8),
	(10, 'crear', 8),
	(11, 'editar', 8),
	(12, 'eliminar', 8),
	(13, 'modulos', NULL),
	(14, 'ver', 13);

-- Volcando estructura para tabla core_csr.mod_permisos_modulo_asignacion
CREATE TABLE IF NOT EXISTS `mod_permisos_modulo_asignacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_permiso` varchar(255) DEFAULT NULL,
  `modulo_padre_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_6eb0af2f8e13274ad1819f4cfca` (`user_id`),
  CONSTRAINT `FK_6eb0af2f8e13274ad1819f4cfca` FOREIGN KEY (`user_id`) REFERENCES `mod_usuarios_admin` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla core_csr.mod_permisos_modulo_asignacion: ~14 rows (aproximadamente)
INSERT INTO `mod_permisos_modulo_asignacion` (`id`, `nombre_permiso`, `modulo_padre_id`, `user_id`) VALUES
	(1, 'usuarios', NULL, 1),
	(2, 'administradores', 1, 1),
	(3, 'crear', 2, 1),
	(4, 'ver', 2, 1),
	(5, 'editar', 2, 1),
	(6, 'eliminar', 2, 1),
	(7, 'asignar_permisos', 2, 1),
	(8, 'ver', 8, 1),
	(9, 'crear', 8, 1),
	(10, 'editar', 8, 1),
	(11, 'eliminar', 8, 1),
	(12, 'finales', 1, 1),
	(13, 'modulos', NULL, 1),
	(14, 'ver', 13, 1);

-- Volcando estructura para tabla core_csr.mod_usuarios_admin
CREATE TABLE IF NOT EXISTS `mod_usuarios_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_c885318c449a37e806a7f87607` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla core_csr.mod_usuarios_admin: ~0 rows (aproximadamente)
INSERT INTO `mod_usuarios_admin` (`id`, `firstName`, `lastName`, `email`, `password`, `isActive`) VALUES
	(1, 'Javier Ricardo', 'Baron Fuentes', 'admin1@correo.com', 'Qwerty9601', 1);

-- Volcando estructura para tabla core_csr.mod_usuarios_user
CREATE TABLE IF NOT EXISTS `mod_usuarios_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_129e1f78d9bf43c04689f16cf8` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla core_csr.mod_usuarios_user: ~0 rows (aproximadamente)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
