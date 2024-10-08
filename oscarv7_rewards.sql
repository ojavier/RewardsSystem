-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-oscarv7.alwaysdata.net
-- Generation Time: Oct 06, 2024 at 03:45 AM
-- Server version: 10.6.18-MariaDB
-- PHP Version: 7.4.33


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `oscarv7_rewards`
--


-- --------------------------------------------------------

--
-- Table structure for table `Clientes`
--

CREATE TABLE `Clientes` (
  `Telefono` char(10) NOT NULL,
  `Entidad` varchar(25) DEFAULT NULL,
  `Genero` varchar(20) DEFAULT NULL,
  `fecha_Nacimiento` date DEFAULT NULL,
  `id_Usuario` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `Establecimientos`
--

CREATE TABLE `Establecimientos` (
  `id_Establecimiento` varchar(36) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `Entidad` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `Etapa`
--

CREATE TABLE `Etapa` (
  `id_Etapa` varchar(36) NOT NULL,
  `Cant_Sellos` int(10) DEFAULT NULL,
  `Minimo_Compra` float DEFAULT NULL,
  `Descuento` float DEFAULT NULL,
  `id_Producto` varchar(36) DEFAULT NULL,
  `Delete_At` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `Ordenes`
--

CREATE TABLE `Ordenes` (
  `id_Orden` varchar(36) NOT NULL,
  `nivel_Satisfaccion` float DEFAULT NULL,
  `Feedback` varchar(200) DEFAULT NULL,
  `id_Establecimiento` varchar(36) DEFAULT NULL,
  `Telefono` char(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `OrdenesTieneProductos`
--

CREATE TABLE `OrdenesTieneProductos` (
  `id_Orden` varchar(36) NOT NULL,
  `id_Producto` varchar(36) NOT NULL,
  `fecha_compra` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `Permisos`
--

CREATE TABLE `Permisos` (
  `id_Permiso` int(3) NOT NULL,
  `Tipo_Permiso` varchar(25) NOT NULL,
  `Descripcion` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `Productos`
--

CREATE TABLE `Productos` (
  `id_Producto` varchar(36) NOT NULL,
  `Descripcion` varchar(200) DEFAULT NULL,
  `Precio` float DEFAULT NULL,
  `id_Establecimiento` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `Roles`
--

CREATE TABLE `Roles` (
  `id_Rol` int(3) NOT NULL,
  `Tipo_Roles` varchar(25) NOT NULL,
  `Descripcion` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `RolesTienenPermisos`
--

CREATE TABLE `RolesTienenPermisos` (
  `id_Rol` int(3) NOT NULL,
  `id_Permiso` int(3) NOT NULL,
  `fecha_asignacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `Sellos`
--

CREATE TABLE `Sellos` (
  `id_Sello` varchar(36) NOT NULL,
  `Fecha_Sello` date NOT NULL,
  `Hora_Sello` time(6) NOT NULL,
  `Telefono` char(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `Sucursales`
--

CREATE TABLE `Sucursales` (
  `id_Sucursal` varchar(36) NOT NULL,
  `Direccion` varchar(100) NOT NULL,
  `Entidad` varchar(30) NOT NULL,
  `id_Establecimiento` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `SucursalesTieneUsuarios`
--

CREATE TABLE `SucursalesTieneUsuarios` (
  `id_Sucursal` varchar(36) NOT NULL,
  `id_Usuario` varchar(36) NOT NULL,
  `FechaIncorporacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `Tarjetas`
--

CREATE TABLE `Tarjetas` (
  `Telefono` char(10) NOT NULL,
  `id_Establecimiento` varchar(36) NOT NULL,
  `Version` float DEFAULT NULL,
  `Emision` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `TarjetasOfrecenEtapa`
--

CREATE TABLE `TarjetasOfrecenEtapa` (
  `id_Etapa` varchar(36) NOT NULL,
  `Telefono` char(10) NOT NULL,
  `Creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `Usuarios`
--

CREATE TABLE `Usuarios` (
  `id_Usuario` varchar(36) NOT NULL,
  `Nombre` text NOT NULL,
  `Apellido` text NOT NULL,
  `Telefono` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `UsuariosTienenRoles`
--

CREATE TABLE `UsuariosTienenRoles` (
  `id_Usuario` varchar(36) NOT NULL,
  `id_Rol` int(3) NOT NULL,
  `fecha_asignacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Indexes for dumped tables
--

--
-- Indexes for table `Clientes`
--
ALTER TABLE `Clientes`
  ADD PRIMARY KEY (`Telefono`),
  ADD KEY `id_Usuario` (`id_Usuario`);

--
-- Indexes for table `Establecimientos`
--
ALTER TABLE `Establecimientos`
  ADD PRIMARY KEY (`id_Establecimiento`);

--
-- Indexes for table `Etapa`
--
ALTER TABLE `Etapa`
  ADD PRIMARY KEY (`id_Etapa`),
  ADD KEY `id_Producto` (`id_Producto`);

--
-- Indexes for table `Ordenes`
--
ALTER TABLE `Ordenes`
  ADD PRIMARY KEY (`id_Orden`),
  ADD KEY `id_Establecimiento` (`id_Establecimiento`),
  ADD KEY `Telefono` (`Telefono`);

--
-- Indexes for table `OrdenesTieneProductos`
--
ALTER TABLE `OrdenesTieneProductos`
  ADD PRIMARY KEY (`id_Orden`,`id_Producto`),
  ADD KEY `id_Producto` (`id_Producto`);

--
-- Indexes for table `Permisos`
--
ALTER TABLE `Permisos`
  ADD PRIMARY KEY (`id_Permiso`);

--
-- Indexes for table `Productos`
--
ALTER TABLE `Productos`
  ADD PRIMARY KEY (`id_Producto`),
  ADD KEY `id_Establecimiento` (`id_Establecimiento`);

--
-- Indexes for table `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`id_Rol`);

--
-- Indexes for table `RolesTienenPermisos`
--
ALTER TABLE `RolesTienenPermisos`
  ADD PRIMARY KEY (`id_Rol`,`id_Permiso`),
  ADD KEY `id_Permiso` (`id_Permiso`);

--
-- Indexes for table `Sellos`
--
ALTER TABLE `Sellos`
  ADD PRIMARY KEY (`id_Sello`),
  ADD KEY `Telefono` (`Telefono`);

--
-- Indexes for table `Sucursales`
--
ALTER TABLE `Sucursales`
  ADD PRIMARY KEY (`id_Sucursal`),
  ADD KEY `fk_establecimiento_sucursal` (`id_Establecimiento`);

--
-- Indexes for table `SucursalesTieneUsuarios`
--
ALTER TABLE `SucursalesTieneUsuarios`
  ADD PRIMARY KEY (`id_Sucursal`,`id_Usuario`),
  ADD KEY `fk_sucursal_usuario_usuario` (`id_Usuario`);

--
-- Indexes for table `Tarjetas`
--
ALTER TABLE `Tarjetas`
  ADD PRIMARY KEY (`Telefono`,`id_Establecimiento`),
  ADD KEY `id_Establecimiento` (`id_Establecimiento`);

--
-- Indexes for table `TarjetasOfrecenEtapa`
--
ALTER TABLE `TarjetasOfrecenEtapa`
  ADD PRIMARY KEY (`id_Etapa`,`Telefono`),
  ADD KEY `Telefono` (`Telefono`);

--
-- Indexes for table `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`id_Usuario`);

--
-- Indexes for table `UsuariosTienenRoles`
--
ALTER TABLE `UsuariosTienenRoles`
  ADD PRIMARY KEY (`id_Usuario`,`id_Rol`),
  ADD KEY `id_Rol` (`id_Rol`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Clientes`
--
ALTER TABLE `Clientes`
  ADD CONSTRAINT `Clientes_ibfk_1` FOREIGN KEY (`id_Usuario`) REFERENCES `Usuarios` (`id_Usuario`);

--
-- Constraints for table `Etapa`
--
ALTER TABLE `Etapa`
  ADD CONSTRAINT `Etapa_ibfk_1` FOREIGN KEY (`id_Producto`) REFERENCES `Productos` (`id_Producto`);

--
-- Constraints for table `Ordenes`
--
ALTER TABLE `Ordenes`
  ADD CONSTRAINT `Ordenes_ibfk_1` FOREIGN KEY (`id_Establecimiento`) REFERENCES `Establecimientos` (`id_Establecimiento`) ON DELETE CASCADE,
  ADD CONSTRAINT `Ordenes_ibfk_2` FOREIGN KEY (`Telefono`) REFERENCES `Clientes` (`Telefono`) ON DELETE CASCADE;

--
-- Constraints for table `OrdenesTieneProductos`
--
ALTER TABLE `OrdenesTieneProductos`
  ADD CONSTRAINT `OrdenesTieneProductos_ibfk_1` FOREIGN KEY (`id_Orden`) REFERENCES `Ordenes` (`id_Orden`) ON DELETE CASCADE,
  ADD CONSTRAINT `OrdenesTieneProductos_ibfk_2` FOREIGN KEY (`id_Producto`) REFERENCES `Productos` (`id_Producto`) ON DELETE CASCADE;

--
-- Constraints for table `Productos`
--
ALTER TABLE `Productos`
  ADD CONSTRAINT `Productos_ibfk_1` FOREIGN KEY (`id_Establecimiento`) REFERENCES `Establecimientos` (`id_Establecimiento`);

--
-- Constraints for table `RolesTienenPermisos`
--
ALTER TABLE `RolesTienenPermisos`
  ADD CONSTRAINT `RolesTienenPermisos_ibfk_1` FOREIGN KEY (`id_Rol`) REFERENCES `Roles` (`id_Rol`) ON DELETE CASCADE,
  ADD CONSTRAINT `RolesTienenPermisos_ibfk_2` FOREIGN KEY (`id_Permiso`) REFERENCES `Permisos` (`id_Permiso`) ON DELETE CASCADE;

--
-- Constraints for table `Sellos`
--
ALTER TABLE `Sellos`
  ADD CONSTRAINT `Sellos_ibfk_1` FOREIGN KEY (`Telefono`) REFERENCES `Tarjetas` (`Telefono`);

--
-- Constraints for table `Sucursales`
--
ALTER TABLE `Sucursales`
  ADD CONSTRAINT `fk_establecimiento_sucursal` FOREIGN KEY (`id_Establecimiento`) REFERENCES `Establecimientos` (`id_Establecimiento`) ON DELETE CASCADE;

--
-- Constraints for table `SucursalesTieneUsuarios`
--
ALTER TABLE `SucursalesTieneUsuarios`
  ADD CONSTRAINT `fk_sucursal_usuario_sucursal` FOREIGN KEY (`id_Sucursal`) REFERENCES `Sucursales` (`id_Sucursal`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_sucursal_usuario_usuario` FOREIGN KEY (`id_Usuario`) REFERENCES `Usuarios` (`id_Usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Tarjetas`
--
ALTER TABLE `Tarjetas`
  ADD CONSTRAINT `Tarjetas_ibfk_1` FOREIGN KEY (`id_Establecimiento`) REFERENCES `Establecimientos` (`id_Establecimiento`),
  ADD CONSTRAINT `Tarjetas_ibfk_2` FOREIGN KEY (`Telefono`) REFERENCES `Clientes` (`Telefono`);

--
-- Constraints for table `TarjetasOfrecenEtapa`
--
ALTER TABLE `TarjetasOfrecenEtapa`
  ADD CONSTRAINT `TarjetasOfrecenEtapa_ibfk_1` FOREIGN KEY (`id_Etapa`) REFERENCES `Etapa` (`id_Etapa`) ON DELETE CASCADE,
  ADD CONSTRAINT `TarjetasOfrecenEtapa_ibfk_2` FOREIGN KEY (`Telefono`) REFERENCES `Tarjetas` (`Telefono`) ON DELETE CASCADE;

--
-- Constraints for table `UsuariosTienenRoles`
--
ALTER TABLE `UsuariosTienenRoles`
  ADD CONSTRAINT `UsuariosTienenRoles_ibfk_1` FOREIGN KEY (`id_Rol`) REFERENCES `Roles` (`id_Rol`) ON DELETE CASCADE,
  ADD CONSTRAINT `UsuariosTienenRoles_ibfk_2` FOREIGN KEY (`id_Usuario`) REFERENCES `Usuarios` (`id_Usuario`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
