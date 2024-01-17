create database Alquiler2;

use Alquiler2;
-- 1*
CREATE TABLE Empleados (
  IdEmpleado INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(50) NOT NULL,
  Apellido VARCHAR(50) NOT NULL,
  Correo VARCHAR(100) NOT NULL,
  Direccion VARCHAR(100) NOT NULL,
  Telefono VARCHAR(20)NOT NULL,
  FechaNacimiento DATE NOT NULL,
  Fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- 1*
CREATE TABLE Tiendas (
    IdTienda INT AUTO_INCREMENT PRIMARY KEY,
    Nit VARCHAR(50) NOT NULL,
    Nombre VARCHAR(50) NOT NULL,
    Direccion VARCHAR(100) NOT NULL,
    Telefono VARCHAR(20) NOT NULL,
    Correo VARCHAR(100) NOT NULL,

);
-- 1*
CREATE TABLE EstadosPago (
    IdEstadoPago INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(50) NOT NULL
);
-- 1*
CREATE TABLE TiposPago (
    IdTipoPago INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(200) NOT NULL
);
-- 1*
CREATE TABLE EstadosRegistroNegativo (
    IdEstadoRegistroNegativo INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(50) NOT NULL
);
-- 1*
CREATE TABLE Clientes (
    IdCliente INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Direccion VARCHAR(100) NOT NULL,
    Cedula VARCHAR(40) NOT NULL,
    Telefono VARCHAR(20) NOT NULL,
    Correo VARCHAR(100) NOT NULL,
    FechaNacimiento DATE NOT NULL,
    ReferenciaNombre VARCHAR(50) NOT NULL,
    ReferenciaNumero VARCHAR(20) NOT NULL,
    FotoDNI VARCHAR(255) NOT NULL,
    FotoServicios VARCHAR(255) NOT NULL,
    FechaRegistro DATE NOT NULL
);
-- 1*
CREATE TABLE Categorias (
    IdCategoria INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(200) NOT NULL
);
-- 1*
CREATE TABLE Tallas (
    IdTalla INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(10) NOT NULL
);
-- 1*
CREATE TABLE Colores (
    IdColor INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion Varchar(50) NOT NULL
);
-- 1*
CREATE TABLE Accesorios (
    IdAccesorio INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(50) NOT NULL,
    
);

-- relacion con tiendas, clientes 3*
CREATE TABLE Alquileres (
    IdAlquiler INT AUTO_INCREMENT PRIMARY KEY,
    FechaInicialAlquiler DATE NOT NULL,
    FechaFinAlquiler DATE NOT NULL,
    IdTienda INT NOT NULL,
    IdCliente INT NOT NULL,
    IdEstadoAlquiler INT NOT NULL,
    FOREIGN KEY (IdTienda) REFERENCES Tiendas(IdTienda),
    FOREIGN KEY (IdCliente) REFERENCES Clientes(IdCliente),
    FOREIGN KEY (IdEstadoAlquiler) REFERENCES (IdEstadoAlquiler)
);

-- TIMESTAMP AUTO FECHA 2*
CREATE TABLE GastosEmpleados (
    GastoEmpleadoID INT AUTO_INCREMENT PRIMARY KEY,
    Descripcion VARCHAR(100) NOT NULL,
    Monto DECIMAL(10, 2) NOT NULL,
    Fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    IdEmpleado INT NOT NULL,
    FOREIGN KEY (IdEmpleado) REFERENCES Empleados(IdEmpleado)
);

-- alquiler y empleado 3*
CREATE TABLE OrdenesCompra ( 
    IdOrdenCompra INT AUTO_INCREMENT PRIMARY KEY,
    FechaCompra TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    TotalCompra DECIMAL(10, 2) NOT NULL,
    IdAlquiler INT NOT NULL,
    IdEmpleado INT NOT NULL,
    FOREIGN KEY (IdAlquiler) REFERENCES Alquileres(IdAlquiler),
    FOREIGN KEY (IdEmpleado) REFERENCES Empleados(IdEmpleado)
); 

-- ordencompra y accesorios 4*
CREATE TABLE AccesoriosOrdenCompra (
    IdAccesorioOrdenCompra INT AUTO_INCREMENT PRIMARY KEY,
    Cantidad INT NOT NULL,
    IdOrdenCompra INT NOT NULL,
    IdAccesorio INT NOT NULL,
    FOREIGN KEY (IdOrdenCompra) REFERENCES OrdenesCompra(IdOrdenCompra),
    FOREIGN KEY (IdAccesorio) REFERENCES Accesorios(IdAccesorio)
);

-- Orden Compra, estado pago, tipo pago
CREATE TABLE Pagos (
    IdPago INT AUTO_INCREMENT PRIMARY KEY,
    FechaPago DATE NOT NULL,
    Valor DECIMAL(10, 2) NOT NULL,
    IdEstadoPago INT NOT NULL,
    IdTipoPago INT NOT NULL,
    IdOrdenCompra INT NOT NULL,
    FOREIGN KEY (IdEstadoPago) REFERENCES EstadosPago(IdEstadoPago),
    FOREIGN KEY (IdTipoPago) REFERENCES TiposPago(IdTipoPago),
    FOREIGN KEY (IdOrdenCompra) REFERENCES OrdenesCompra(IdOrdenCompra)
);

-- orden compra, EstadoRegistroNegativo
CREATE TABLE RegistrosNegativos (
    IdRegistroNegativo INT AUTO_INCREMENT PRIMARY KEY,
    FechaRegistroNegativo DATE NOT NULL,
    IdOrdenCompra INT NOT NULL,
    IdEstadoRegistroNegativo INT NOT NULL,
    FOREIGN KEY (IdOrdenCompra) REFERENCES OrdenesCompra(IdOrdenCompra),
    FOREIGN KEY (IdEstadoRegistroNegativo) REFERENCES EstadosRegistroNegativo(IdEstadoRegistroNegativo)
);

-- categoria, colores, tallas 2*
CREATE TABLE Articulos (
    IdArticulo INT AUTO_INCREMENT PRIMARY KEY,
    NombreArticulo VARCHAR (100) NOT NULL,
    IdCategoria INT NOT NULL,
    IdColor INT NOT NULL,
    IdTalla INT NOT NULL,
    FOREIGN KEY (IdCategoria) REFERENCES Categorias(IdCategoria),
    FOREIGN KEY (IdColor) REFERENCES Colores(IdColor),
    FOREIGN KEY(IdTalla) REFERENCES Tallas(IdTalla)
);

-- accesorios 2*
CREATE TABLE InventarioAccesorios (
    IdInventario INT AUTO_INCREMENT PRIMARY KEY,
    CantidadDisponible INT NOT NULL,
    IdAccesorio INT NOT NULL,
    FOREIGN KEY (IdAccesorio) REFERENCES Accesorios(IdAccesorio)
);

-- articulos 2*
CREATE TABLE InventarioArticulos (
    IdInventario INT AUTO_INCREMENT PRIMARY KEY,
    CantidadDisponible INT NOT NULL,
    IdArticulo INT NOT NULL,
    FOREIGN KEY (IdArticulo) REFERENCES Articulos(IdArticulo)
);

-- orden compra, articulo 4*
CREATE TABLE ArticulosOrdenCompra (
    IdArticuloOrdenCompra INT AUTO_INCREMENT PRIMARY KEY,
    Cantidad INT NOT NULL,
    IdArticulo INT NOT NULL,
    IdOrdenCompra INT NOT NULL,
    FOREIGN KEY (IdArticulo) REFERENCES Articulos(IdArticulo),
    FOREIGN KEY (IdOrdenCompra) REFERENCES OrdenesCompra(IdOrdenCompra)
);