-- Skapar en tabell för att lagra kanaler
CREATE TABLE channels (
  channel_id SERIAL PRIMARY KEY,
  channel_name NVARCHAR(30) UNIQUE NOT NULL,
  owner_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,  
  -- ID för användaren som äger kanalen. Tas bort automatiskt om användaren raderas
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

