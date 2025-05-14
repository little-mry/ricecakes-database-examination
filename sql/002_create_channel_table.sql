CREATE TABLE channels (
    channel_id SERIAL PRIMARY KEY,
    channel_name VARCHAR(30) UNIQUE NOT NULL,
    owner_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE CASCADE
);
