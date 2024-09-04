-- Tabla Permiso
CREATE TABLE Permiso (
    id INT PRIMARY KEY,
    Tipo VARCHAR(255),
    Descripcion TEXT
);

-- Tabla Rol
CREATE TABLE Rol (
    id INT PRIMARY KEY,
    Tipo VARCHAR(255),
    Descripcion TEXT
);

-- Tabla Usuario
CREATE TABLE Usuario (
    id INT PRIMARY KEY,
    Nombre VARCHAR(255),
    Apellido VARCHAR(255),
    Telefono VARCHAR(20) UNIQUE
);

-- Tabla Cliente
CREATE TABLE Cliente (
    Telefono VARCHAR(20) PRIMARY KEY,
    Entidad VARCHAR(255),
    Genero VARCHAR(10),
    Fecha_Nacimiento DATE,
    FOREIGN KEY (Telefono) REFERENCES Usuario(Telefono)
);

-- Tabla Tarjeta
CREATE TABLE Tarjeta (
    Folio VARCHAR(50) PRIMARY KEY,
    Caducidad DATE
);

-- Tabla Sello
CREATE TABLE Sello (
    id_Sello INT PRIMARY KEY,
    Hora_Sello TIME,
    Fecha_Sello DATE,
    Folio_Tarjeta VARCHAR(50),
    FOREIGN KEY (Folio_Tarjeta) REFERENCES Tarjeta(Folio)
);

-- Tabla Etapa
CREATE TABLE Etapa (
    id_Etapa INT PRIMARY KEY,
    Cant_Sellos INT,
    Minimo_Compra DECIMAL(10, 2),
    Descuento DECIMAL(5, 2)
);

-- Tabla Orden
CREATE TABLE Orden (
    id_Orden INT PRIMARY KEY,
    Feedback TEXT,
    Nivel_Satisfaccion INT,
    Telefono_Cliente VARCHAR(20),
    FOREIGN KEY (Telefono_Cliente) REFERENCES Cliente(Telefono)
);

-- Tabla Producto
CREATE TABLE Producto (
    id_Producto INT PRIMARY KEY,
    Descripcion TEXT,
    Precio DECIMAL(10, 2)
);

-- Tabla Establecimiento
CREATE TABLE Establecimiento (
    id_Establecimiento INT PRIMARY KEY,
    Nombre VARCHAR(255),
    Entidad VARCHAR(255)
);

-- Tabla RolTienePermiso
CREATE TABLE RolTienePermiso (
    id_Permiso INT,
    id_Rol INT,
    Fecha_Asignacion DATE,
    Hora_Asignacion TIME,
    PRIMARY KEY (id_Permiso, id_Rol),
    FOREIGN KEY (id_Permiso) REFERENCES Permiso(id),
    FOREIGN KEY (id_Rol) REFERENCES Rol(id)
);

-- Tabla UsuarioTieneRol
CREATE TABLE UsuarioTieneRol (
    id_Rol INT,
    id_Usuario INT,
    Fecha_Asignacion DATE,
    Hora_Asignacion TIME,
    PRIMARY KEY (id_Rol, id_Usuario),
    FOREIGN KEY (id_Rol) REFERENCES Rol(id),
    FOREIGN KEY (id_Usuario) REFERENCES Usuario(id)
);

-- Tabla ClientesTieneTarjetas
CREATE TABLE ClientesTieneTarjetas (
    Telefono VARCHAR(20),
    Folio VARCHAR(50),
    Emision DATE,
    PRIMARY KEY (Telefono, Folio),
    FOREIGN KEY (Telefono) REFERENCES Cliente(Telefono),
    FOREIGN KEY (Folio) REFERENCES Tarjeta(Folio)
);

-- Tabla EtapasOfrecenTarjetas
CREATE TABLE EtapasOfrecenTarjetas (
    id_Etapa INT,
    id_Tarjeta VARCHAR(50),
    PRIMARY KEY (id_Etapa, id_Tarjeta),
    FOREIGN KEY (id_Etapa) REFERENCES Etapa(id_Etapa),
    FOREIGN KEY (id_Tarjeta) REFERENCES Tarjeta(Folio)
);

-- Tabla OrdenesTieneProducto
CREATE TABLE OrdenesTieneProducto (
    id_Orden INT,
    id_Producto INT,
    Cantidad INT,
    Fecha_Compra DATE,
    Hora_Compra TIME,
    PRIMARY KEY (id_Orden, id_Producto),
    FOREIGN KEY (id_Orden) REFERENCES Orden(id_Orden),
    FOREIGN KEY (id_Producto) REFERENCES Producto(id_Producto)
);