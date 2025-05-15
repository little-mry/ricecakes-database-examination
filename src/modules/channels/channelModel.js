// modules/channelModel.js
import { query } from "../../db/db.js";

export async function getAllChannels() {
  const result = await query("SELECT * FROM channels");
  return result.rows;
}

export async function createChannel(name, owner_id) {
  const result = await query(
    "INSERT INTO channels (name, owner_id) VALUES ($1, $2) RETURNING *",
    [name, owner_id]
  );
  return result.rows[0];
}
export async function getChannelById(channelId) {
  const result = await query("SELECT * FROM channels WHERE channel_id = $1", [
    channelId,
  ]);
  return result.rows[0];
}

export async function getMessagesInChannel(channelId) {
  const result = await query(
    "SELECT * FROM messages WHERE channel_id = $1 ORDER BY created_at ASC",
    [channelId]
  );
  return result.rows;
}

export async function postMessageToChannel(channelId, userId, content) {
  const result = await query(
    "INSERT INTO messages (channel_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
    [channelId, userId, content]
  );
  return result.rows[0];
}
