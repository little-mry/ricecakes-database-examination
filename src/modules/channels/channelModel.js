// modules/channelModel.js
import { query } from "../db.js";

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
