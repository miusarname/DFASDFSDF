-- Creación de la base de datos contabilidad2
CREATE DATABASE IF NOT EXISTS contabilidad5;

-- Uso de la base de datos contabilidad2
USE contabilidad5;

-- Tabla cuentas que almacena las diferentes cuentas contables
CREATE TABLE cuentas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100),
  tipo VARCHAR(100)
);

-- Tabla usuarios que almacena los datos de los usuarios
CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100)
);

-- Tabla para relacionar usuarios con cuentas (tabla de asignación)
CREATE TABLE usuarios_cuentas (
  usuario_id INT,
  cuenta_id INT,
  PRIMARY KEY (usuario_id, cuenta_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (cuenta_id) REFERENCES cuentas(id)
);

-- Tabla ingresos que registra los ingresos y su cuenta asociada
CREATE TABLE ingresos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cuenta_ingreso_id INT,
  concepto VARCHAR(100),
  monto DECIMAL(10, 2),
  fecha_registro DATE,
  FOREIGN KEY (cuenta_ingreso_id) REFERENCES cuentas(id)
);

-- Tabla egresos que registra los egresos y su cuenta asociada
CREATE TABLE egresos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cuenta_egreso_id INT,
  concepto VARCHAR(100),
  monto DECIMAL(10, 2),
  fecha_registro DATE,
  FOREIGN KEY (cuenta_egreso_id) REFERENCES cuentas(id)
);

-- Resto de las tablas...

-- Tabla devengado que registra el devengado y su cuenta asociada
CREATE TABLE devengado (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cuenta_devengado_id INT,
  concepto VARCHAR(100),
  monto DECIMAL(10, 2),
  fecha_registro DATE,
  FOREIGN KEY (cuenta_devengado_id) REFERENCES cuentas(id)
);

-- Tabla valuacion_costo que registra la valuación al costo y su cuenta asociada
CREATE TABLE valuacion_costo (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cuenta_valuacion_costo_id INT,
  costo DECIMAL(10, 2),
  fecha_registro DATE,
  FOREIGN KEY (cuenta_valuacion_costo_id) REFERENCES cuentas(id)
);






-- Tabla patrimonio que registra el patrimonio y su cuenta asociada
CREATE TABLE patrimonio (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cuenta_patrimonio_id INT,
  nombre VARCHAR(100),
  valor DECIMAL(10, 2),
  fecha_registro DATE,
  FOREIGN KEY (cuenta_patrimonio_id) REFERENCES cuentas(id)
);

-- Tabla pasivos que registra los pasivos y su cuenta asociada
CREATE TABLE pasivos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cuenta_pasivo_id INT,
  nombre VARCHAR(100),
  valor DECIMAL(10, 2),
  fecha_vencimiento DATE,
  FOREIGN KEY (cuenta_pasivo_id) REFERENCES cuentas(id)
);

-- Tabla bienes_economicos que almacena los diferentes bienes económicos
CREATE TABLE bienes_economicos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100),
  tipo VARCHAR(100)
);

-- Tabla activos que registra los activos y su cuenta asociada
CREATE TABLE activos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cuenta_activo_id INT,
  bien_id INT,
  nombre VARCHAR(100),
  valor DECIMAL(10, 2),
  fecha_adquisicion DATE,
  FOREIGN KEY (cuenta_activo_id) REFERENCES cuentas(id),
  FOREIGN KEY (bien_id) REFERENCES bienes_economicos(id)
);

-- Tabla transacciones que registra las transacciones entre cuentas
CREATE TABLE transacciones (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cuenta_origen_id INT,
  cuenta_destino_id INT,
  monto DECIMAL(10, 2),
  fecha_registro DATE,
  FOREIGN KEY (cuenta_origen_id) REFERENCES cuentas(id),
  FOREIGN KEY (cuenta_destino_id) REFERENCES cuentas(id)
);

