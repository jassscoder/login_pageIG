ALTER TABLE users
ADD COLUMN preferred_palette ENUM('morning', 'afternoon', 'night') NOT NULL DEFAULT 'morning',
ADD COLUMN intro_animation_enabled TINYINT(1) NOT NULL DEFAULT 1;
