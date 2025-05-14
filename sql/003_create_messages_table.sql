CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    content TEXT NOT NULL,
    channel_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
)