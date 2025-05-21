-- Skapar en tabell för att lagra användare
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name NVARCHAR(20),
    last_name NVARCHAR(40),
    username VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);