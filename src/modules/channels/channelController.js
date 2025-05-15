// modules/channelController.js
import { getAllChannels, createChannel } from "./channelModel.js";

export async function fetchAllChannels(req, res) {
  try {
    const channels = await getAllChannels();
    return res.status(200).json({
      success: true,
      data: channels});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ 
      success: true,
      error: "Något gick fel vid hämtning av kanaler" });
  }
}

export async function addChannel(req, res) {
  const { name, owner_id } = req.body;
  if (!name || !owner_id) {
    return res.status(400).json({ error: "name och owner_id krävs" });
  }

  try {
    const newChannel = await createChannel(name, owner_id);
    return res.status(201).json({
      success: true,
      data: newChannel});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ 
      success: false,
      error: "Kunde inte skapa kanal" });
  }
}
