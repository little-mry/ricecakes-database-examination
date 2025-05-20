import { query } from "../../db/db.js";

// Hämtar alla kanaler från databasen
export async function getAllChannels() {
  const result = await query("SELECT * FROM channels");
  return result.rows;
}

// Skapar en ny kanal
export async function createChannel(name, userId) {
  console.log('userid:', userId);
  
  const result = await query(
    "INSERT INTO channels (channel_name, owner_id) VALUES ($1, $2) RETURNING *",
    [name, userId]
  );
  return result.rows[0];
}

// Hämtar en specifik kanal baserat på kanalens ID
export async function getChannelById(channelId) {
  const result = await query("SELECT * FROM channels WHERE channel_id = $1", [
    channelId,
  ]);
  return result.rows[0];
}

// Hämtar alla meddelanden som tillhör en specifik kanal
export async function getMessagesInChannel(channelId) {
  const result = await query(
    "SELECT * FROM messages WHERE channel_id = $1 ORDER BY sent_at ASC",
    [channelId]
  );
  return result.rows;
}

// Lägger till ett nytt meddelande i en kanal
export async function postMessageToChannel(channelId, userId, title, content) {
  const result = await query(
    "INSERT INTO messages (channel_id, user_id, title, content) VALUES ($1, $2, $3, $4) RETURNING *",
    [channelId, userId, title, content]
  );
  return result.rows[0];
}
