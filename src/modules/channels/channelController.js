import {
  getAllChannels,
  createChannel,
  getChannelById as getChannelModel,
  getMessagesInChannel as getMessagesModel,
  postMessageToChannel as postMessageModel,
} from "./channelModel.js";

export async function fetchAllChannels(req, res) {
  try {
    const channels = await getAllChannels();
    return res.status(200).json({
      success: true,
      data: channels,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "Något gick fel vid hämtning av kanaler",
    });
  }
}

export async function getChannelById(req, res) {
  const { channelId } = req.params;
  try {
    const channel = await getChannelModel(channelId);
    if (!channel) {
      return res.status(404).json({ error: "Kanal hittades inte" });
    }
    return res.status(200).json({
      success: true,
      data: channel,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "Fel vid hämtning av kanal",
    });
  }
}

export async function addChannel(req, res) {
  const { channel_name } = req.body;
  const userId = req.user.id
  console.log('req.user: ', userId);
  
  if (!channel_name) {
    return res.status(400).json({ error: "name krävs" });
  }

  try {
    const newChannel = await createChannel(channel_name, userId);
    return res.status(201).json({
      success: true,
      data: newChannel,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "Kunde inte skapa kanal",
    });
  }
}

export async function getMessagesInChannel(req, res) {
  const { channelId } = req.params;

  try {
    const messages = await getMessagesModel(channelId);
    return res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "Fel vid hämtning av meddelanden",
    });
  }
}

export async function postMessageToChannel(req, res) {
  const { channelId } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "title och content krävs" });
  }

  try {
    const newMessage = await postMessageModel(channelId, req.user.id, title, content);
    return res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "Kunde inte posta meddelande",
    });
  }
}
