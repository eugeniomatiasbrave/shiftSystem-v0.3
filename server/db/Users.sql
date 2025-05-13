CREATE DATABASE IF NOT EXISTS ShiftApi_dev; 

USE ShiftApi_dev;

CREATE TABLE Users (
       id_user INT AUTO_INCREMENT PRIMARY KEY,
       firstName VARCHAR(100) NOT NULL,
       lastName VARCHAR(100) NOT NULL,
       email VARCHAR(100) NOT NULL UNIQUE,
       phone VARCHAR(15),
       day_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       password VARCHAR(255) NOT NULL,
       role ENUM ('admin', 'user') DEFAULT 'user'
);