import {
  getSubscriptionsByUser,
  addSubscription,
} from "./subscriptionModel.js";

// Hämta alla prenumerationer för en användare
export async function getUserSubscriptions(req, res) {
  const userId = req.user.id ;

  if (!userId) {
    return res.status(401).json({ error: "Ingen användare angiven" });
  }

  try {
    const subscriptions = await getSubscriptionsByUser(userId);
    return res.status(200).json({ success: true, data: subscriptions });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Kunde inte hämta prenumerationer" });
  }
}

// Prenumerera på kanal
export async function subscribeToChannel(req, res) {
  const userId = req.user.id;
  const { channel_id } = req.body;

  if (!userId || !channel_id) {
    return res.status(400).json({ error: "user_id och channel_id krävs" });
  }

  try {
    const subscription = await addSubscription(userId, channel_id);
    if (!subscription) {
      return res
        .status(200)
        .json({ success: true, message: "Redan prenumerant" });
    }
    return res.status(201).json({ success: true, data: subscription });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Kunde inte skapa prenumeration" });
  }
}
