-- Skapar en tabell för meddelanden som postas i kanaler
CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    title NVARCHAR(50),
    content TEXT NOT NULL,
    channel_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      -- Kopplar meddelandet till en kanal. Om kanalen tas bort raderas även meddelandet
    FOREIGN KEY (channel_id) REFERENCES channels(channel_id) ON DELETE CASCADE,
    -- Kopplar meddelandet till användaren som skrev det. Raderas om användaren tas bort
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);