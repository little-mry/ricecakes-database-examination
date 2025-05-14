CREATE TABLE subscriptions (
    user_id INTEGER NOT NULL,
    channel_id INTEGER NOT NULL,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, channel_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (channel_id) REFERENCES channels(channel_id) ON DELETE CASCADE
);
