ALTER TABLE users
ADD COLUMN preferred_theme ENUM('light', 'dark') NOT NULL DEFAULT 'light';
