CREATE DATABASE IF NOT EXISTS ShiftApi_dev; 

USE ShiftApi_dev; 

CREATE TABLE Shifts (
       id_shift INT AUTO_INCREMENT PRIMARY KEY,
       date DATE NOT NULL,
       time TIME NOT NULL, 
       status ENUM('available', 'reserved', 'canceled') NOT NULL DEFAULT 'available',
       id_user INT,
       FOREIGN KEY (id_user) REFERENCES Users (id_user) ON DELETE SET NULL
);

-- Crear índice para optimizar búsquedas por id_user
CREATE INDEX idx_shift_id_user ON Shifts (id_user);



