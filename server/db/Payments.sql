
CREATE DATABASE IF NOT EXISTS shiftapi_dev;

USE shiftapi_dev;

CREATE TABLE IF NOT EXISTS payments (
  id_payment INT NOT NULL AUTO_INCREMENT,
  id_shift INT NOT NULL,
  id_user INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'ARS',
  payment_method VARCHAR(255) NOT NULL,
  payment_status ENUM('pending', 'completed', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
  transaction_id VARCHAR(255),
  payment_details JSON,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id_payment),
  FOREIGN KEY (id_shift) REFERENCES shifts(id_shift) ON DELETE CASCADE,
  FOREIGN KEY (id_user) REFERENCES users(id_user)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_payments_user ON payments(id_user);
CREATE INDEX idx_payments_shift ON payments(id_shift);
CREATE INDEX idx_payments_status ON payments(payment_status); 