import { query } from "../../db/db.js";

// Kollar om en viss användare redan är prenumerant på en viss kanal
export async function isUserSubscribed(userId, channelId) {
  const result = await query("SELECT 1 FROM subscriptions WHERE user_id = $1 AND channel_id = $2", [
    userId,
    channelId,
  ]);
  // Returnerar true om det finns en match i subscriptions-tabellen
  return result.rowCount > 0;
}

// Hämtar alla kanaler som en specifik användare är prenumerant på
export async function getSubscriptionsByUser(userId) {
  const result = await query(
    `SELECT c.channel_id, c.channel_name, s.user_id
     FROM subscriptions s
     JOIN channels c ON s.channel_id = c.channel_id
     WHERE s.user_id = $1`,
    [userId]
  );
  // Returnerar en lista med kanaler användaren följer
  return result.rows;
}

// Skapar en ny prenumeration om den inte redan finns
export async function addSubscription(userId, channelId) {
  const result = await query(
    `INSERT INTO subscriptions (user_id, channel_id)
     VALUES ($1, $2)
     ON CONFLICT DO NOTHING
     RETURNING *`,
    [userId, channelId]
  );
  return result.rows[0];
}
