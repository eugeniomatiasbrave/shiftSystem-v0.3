

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS shiftapi_dev;

-- Usar la base de datos
USE shiftapi_dev;

-- Crear la tabla Shifts


CREATE TABLE IF NOT EXISTS Shifts (
  id_shift INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status ENUM('available', 'pending_payment','reserved', 'canceled') DEFAULT 'available',
  id_user INT NULL,
  id_payment_confirmed INT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uniqueShift (date, time),
  FOREIGN KEY (id_user) REFERENCES Users(id_user) ON DELETE SET NULL
);

-- Crear el procedimiento almacenado para generar turnos
DROP PROCEDURE IF EXISTS GenerateShifts;
DELIMITER $$
CREATE PROCEDURE GenerateShifts()
BEGIN
  DECLARE currentDate DATE;
  DECLARE timeSlot TIME;
  DECLARE timeSlotList CURSOR FOR SELECT '10:00:00' AS timeSlot
                                  UNION ALL SELECT '11:00:00'
                                  UNION ALL SELECT '12:00:00'
                                  UNION ALL SELECT '13:00:00'
                                  UNION ALL SELECT '14:00:00'
                                  UNION ALL SELECT '16:00:00'
                                  UNION ALL SELECT '17:00:00'
                                  UNION ALL SELECT '18:00:00';
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET timeSlot = NULL;

  SET currentDate = CURDATE(); -- Fecha de inicio (hoy)
  SET @endDate = DATE_ADD(currentDate, INTERVAL 180 DAY); -- Fecha de fin (6 meses desde hoy)

  WHILE currentDate <= @endDate DO
    OPEN timeSlotList;
    timeSlotLoop: LOOP
      FETCH timeSlotList INTO timeSlot;
      IF timeSlot IS NULL THEN
        LEAVE timeSlotLoop;
      END IF;

      -- Verificar si el turno ya existe
      IF NOT EXISTS (
        SELECT 1 FROM Shifts WHERE date = currentDate AND time = timeSlot
      ) THEN
        -- Insertar el turno
        INSERT INTO Shifts (date, time, status, id_user, created_at, updated_at)
        VALUES (currentDate, timeSlot, 'available', NULL, NOW(), NOW());
      END IF;
    END LOOP;
    CLOSE timeSlotList;

    -- Avanzar al siguiente día
    SET currentDate = DATE_ADD(currentDate, INTERVAL 1 DAY);
  END WHILE;
END$$
DELIMITER ;

-- Ejecutar el procedimiento para generar los turnos
CALL GenerateShifts();

-- Crear índices para optimizar búsquedas
CREATE INDEX idx_shift_id_user ON Shifts (id_user);
CREATE INDEX idx_date_time ON Shifts (date, time);