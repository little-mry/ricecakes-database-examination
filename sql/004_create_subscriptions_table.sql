-- Tabell som lagrar vilka användare som är med i vilka kanaler
CREATE TABLE subscriptions (
    user_id INTEGER NOT NULL,
    channel_id INTEGER NOT NULL,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, channel_id),
    -- Om användaren tas bort raderas prenumerationen
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    -- Om kanalen tas bort raderas prenumerationen
    FOREIGN KEY (channel_id) REFERENCES channels(channel_id) ON DELETE CASCADE
);
