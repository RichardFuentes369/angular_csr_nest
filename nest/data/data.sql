-- Volcando datos para la tabla core_csr.mod_permisos_modulo: ~22 rows (aproximadamente)
INSERT INTO `core_csr`.`mod_permisos_modulo` (`id`, `nombre`, `permiso`, `tiene_submodulos`, `descripcion`, `modulo_padre_id`) VALUES
	(1, 'Usuarios', 'usuarios', 1, 'Modulo usuarios', NULL),
	(2, 'Administradores', 'administradores', 0, 'Submodulo administradores, modulo usuarios', 1),
	(3, 'Ver', 'Ver', 0, 'Permiso ver, submodulo administradores, modulo usuarios', 2),
	(4, 'Crear', 'crear', 0, 'Permiso crear, submodulo administradores, modulo usuarios', 2),
	(5, 'Editar', 'editar', 0, 'Permiso editar, submodulo administradores, modulo usuarios', 2),
	(6, 'Eliminar (individual)', 'eliminar_individual', 0, 'Permiso eliminar individual, submodulo administradores, modulo usuarios', 2),
	(7, 'Eliminar (multiple)', 'eliminar_multiple', 0, 'Permiso eliminar multiple, submodulo administradores, modulo usuarios', 2),
	(8, 'Estado (usuario)', 'estado_usuario', 0, 'Permiso estado usuario, submodulo administradores, modulo usuarios', 2),
	(9, 'Permisos (asignar)', 'asignar_permisos', 0, 'Permiso asignar_permisos usuario, submodulo administradores, modulo usuarios', 2),
	(10, 'Finales', 'finales', 0, 'Submodulo finales, modulo usuarios', 1),
	(11, 'Ver', 'ver', 0, 'Permiso ver, submodulo finales, modulo usuarios', 10),
	(12, 'Crear', 'crear', 0, 'Permiso crear, submodulo finales, modulo usuarios', 10),
	(13, 'Editar', 'editar', 0, 'Permiso editar, submodulo finales, modulo usuarios', 10),
	(14, 'Eliminar (individual)', 'eliminar_individual', 0, 'Permiso eliminar individual, submodulo finales, modulo usuarios', 10),
	(15, 'Eliminar (multiple)', 'eliminar_multiple', 0, 'Permiso eliminar multiple, submodulo finales, modulo usuarios', 10),
	(16, 'Estado (usuario)', 'estado_usuario', 0, 'Permiso estado usuario, submodulo finales, modulo usuarios', 10),
	(17, 'Modulos', 'modulos', 1, 'Modulo modulos', NULL),
	(18, 'Ver', 'ver', 0, 'Permiso ver, modulo modulos', 17),
	(19, 'Crear', 'crear', 0, 'Permiso crear, modulo modulos', 17),
	(20, 'Editar', 'editar', 0, 'Permiso editar, modulo modulos', 17),
	(21, 'Eliminar (individual)', 'eliminar_individual', 0, 'Permiso eliminar_individual, modulo modulos', 17);

INSERT INTO `core_csr`.`mod_usuarios_admin` (`firstName`, `lastName`, `email`, `password`) VALUES ('Administrador', 'principal', 'admin1@correo.com', 'Qwerty9601');

-- Volcando datos para la tabla core_csr.mod_permisos_modulo_asignacion: ~18 rows (aproximadamente)
INSERT INTO `mod_permisos_modulo_asignacion` (`id`, `nombre`, `permiso`, `descripcion`, `modulo_padre_id`, `user_id`) VALUES
	(1, 'Usuarios', 'usuarios', 'Modulo usuarios', NULL, 1),
	(2, 'Administradores', 'administradores', 'Submodulo administradores, modulo usuarios', 1, 1),
	(3, 'Ver', 'Ver', 'Permiso ver, submodulo administradores, modulo usuarios', 2, 1),
	(4, 'Crear', 'crear', 'Permiso crear, submodulo administradores, modulo usuarios', 2, 1),
	(5, 'Editar', 'editar', 'Permiso editar, submodulo administradores, modulo usuarios', 2, 1),
	(7, 'Eliminar (multiple)', 'eliminar_multiple', 'Permiso eliminar multiple, submodulo administradores, modulo usuarios', 2, 1),
	(8, 'Estado (usuario)', 'estado_usuario', 'Permiso estado usuario, submodulo administradores, modulo usuarios', 2, 1),
	(9, 'Permisos (asignar)', 'asignar_permisos', 'Permiso asignar_permisos usuario, submodulo administradores, modulo usuarios', 2, 1),
	(10, 'Finales', 'finales', 'Submodulo finales, modulo usuarios', 1, 1),
	(11, 'Ver', 'ver', 'Permiso ver, submodulo finales, modulo usuarios', 10, 1),
	(12, 'Crear', 'crear', 'Permiso crear, submodulo finales, modulo usuarios', 10, 1),
	(13, 'Editar', 'editar', 'Permiso editar, submodulo finales, modulo usuarios', 10, 1),
	(14, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar individual, submodulo finales, modulo usuarios', 10, 1),
	(15, 'Estado (usuario)', 'estado_usuario', 'Permiso estado usuario, submodulo finales, modulo usuarios', 10, 1),
	(16, 'Modulos', 'modulos', 'Modulo modulos', NULL, 1),
	(17, 'Ver', 'ver', 'Permiso ver, modulo modulos', 17, 1),
	(18, 'Crear', 'crear', 'Permiso crear, modulo modulos', 17, 1),
	(19, 'Editar', 'editar', 'Permiso editar, modulo modulos', 17, 1),
	(20, 'Eliminar (individual)', 'eliminar_individual', 'Permiso eliminar_individual, modulo modulos', 17, 1);
