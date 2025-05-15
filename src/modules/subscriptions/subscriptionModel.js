import { query } from "../../db/db.js";

export async function getSubscriptionsByUser(userId) {
  const result = await query(
    `SELECT s.subscription_id, c.channel_id, c.channel_name, c.owner_id
     FROM subscriptions s
     JOIN channels c ON s.channel_id = c.channel_id
     WHERE s.user_id = $1`,
    [userId]
  );
  return result.rows;
}

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
