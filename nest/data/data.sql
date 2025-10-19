
INSERT INTO `mod_permisos_modulo` (`id`,`modulo_padre_id`,`nombre`,`permiso`,`tiene_submodulos`,`descripcion`) VALUES
(1, null, 'Usuarios', 'usuarios', 1, 'Modulo usuarios'),
(2, 1,'Administradores', 'administradores', 0, 'Submodulo usuarios administradores'),
(3, 2,'Crear', 'crear', 0, 'permiso'),
(4, 2,'Ver', 'ver', 0, 'permiso'),
(5, 2,'Editar', 'editar', 0, 'permiso'),
(6, 2,'Eliminar', 'eliminar', 0, 'permiso'),
(7, 2,'Asignar permisos', 'asignar_permisos', 0, 'permiso'),
(8, 1,'Finales', 'finales', 0, 'Submodulo usuarios finales'),
(9, 8,'Ver', 'ver', 0, 'permiso'),
(10, 8,'Crear', 'crear', 0, 'permiso'),
(11, 8,'Editar', 'editar', 0, 'permiso'),
(12, 8,'Eliminar', 'eliminar', 0, 'permiso'),
(13, null,'Modulos', 'modulos', 0, 'Modulo modulos'),
(14, 13,'Ver', 'ver', 0, 'permiso'),
(15, 13,'Crear', 'crear', 0, 'permiso'),
(16, 13,'Editar', 'editar', 0, 'permiso'),
(17, 13,'Eliminar', 'eliminar', 0, 'permiso');

INSERT INTO `core_csr`.`mod_usuarios_admin` (`firstName`, `lastName`, `email`, `password`) VALUES ('Administrador', 'principal', 'admin1@correo.com', 'Qwerty9601');

INSERT INTO `mod_permisos_modulo_asignacion` (`id`,`modulo_padre_id`,`user_id`,`nombre`,`permiso`,`descripcion`) VALUES
(1, null, 1, 'Usuarios', 'usuarios', 'Modulo usuarios'),
(2, 1, 1, 'Administradores', 'administradores', 'Submodulo usuarios administradores'),
(3, 2, 1, 'Crear', 'crear', 'permiso'),
(4, 2, 1, 'Ver', 'ver', 'permiso'),
(5, 2, 1, 'Editar', 'editar', 'permiso'),
(6, 2, 1, 'Eliminar', 'eliminar', 'permiso'),
(7, 2, 1, 'Asignar permisos', 'asignar_permisos', 'permiso'),
(8, 1, 1, 'Finales', 'finales', 'Submodulo usuarios finales'),
(9, 8, 1, 'Ver', 'ver', 'permiso'),
(10, 8, 1, 'Crear', 'crear', 'permiso'),
(11, 8, 1, 'Editar', 'editar', 'permiso'),
(12, 8, 1, 'Eliminar', 'eliminar', 'permiso'),
(13, null, 1, 'Modulos', 'modulos', 'Modulo modulos'),
(14, 13, 1, 'Ver', 'ver', 'permiso'),
(15, 13, 1, 'Crear', 'crear', 'permiso'),
(16, 13, 1, 'Editar', 'editar', 'permiso'),
(17, 13, 1, 'Eliminar', 'eliminar', 'permiso');