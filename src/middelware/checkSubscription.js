import { query } from "../db/db.js";

// Middleware som kollar om en användare är prenumererad på en viss kanal
export async function checkSubscription(req, res, next) {
  const userId = req.user?.id;
  const channelId = req.params.channelId || req.body.channelId;
  if (!channelId) {
    return res.status(400).json({ error: "Channel ID missing" });
  }
  try {
    const result = await query(
      "SELECT 1 FROM subscriptions WHERE user_id = $1 AND channel_id = $2",
      [userId, channelId]
    );
    if (result.rowCount > 0) {
      return next();
    } else {
      return res
        .status(403)
        .json({ error: "User is not subscribed to this channel" });
    }
  } catch (err) {
    console.error("Subscription check failed", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
