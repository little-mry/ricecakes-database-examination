import { fetchMessageById, updateMessageById, removeMessageById } from "./messageModel.js";

// Hämtar ett specifikt meddelande som tillhör den inloggade användaren
export const getMessageById = async (req, res) => {
  const { msgId } = req.params;

  try {
    // Hämtar meddelandet med angivet ID och kontrollerar att det tillhör användaren
    const [message] = await fetchMessageById(msgId, req.user.id);
    if (!message) {
      return res.status(404).json({ error: "Inget meddelande hittades" });
    }
    // Skickar tillbaka meddelandet om det hittas
    return res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Något gick fel vid hämtning av meddelande",
    });
  }
};

// Uppdatera ett meddelande
export const changeMessageById = async (req, res) => {
  const { msgId } = req.params;
  const { title, content } = req.body;
  try {
    // Uppdatera titel och innehåll på ett meddelande
    const [updatedMessage] = await updateMessageById(msgId, req.user.id, {
      title,
      content,
    });
    if (!updatedMessage) {
      return res.status(404).json({ error: "Inget meddelande uppdaterades" });
    }
    // Skickar tillbaka det uppdaterade meddelandet
    return res.status(200).json({
      success: true,
      data: updatedMessage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Något gick fel vid uppdatering av meddelande",
    });
  }
};

// Radera ett meddelande
export const deleteMessageById = async (req, res) => {
  const { msgId } = req.params;
  try {
    const [removedMessage] = await removeMessageById(msgId, req.user.id);
    if (!removedMessage) {
      return res.status(404).json({ error: "Inget meddelande har raderats" });
    }

    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Något gick fel vid borttagning av meddelande",
    });
  }
};
