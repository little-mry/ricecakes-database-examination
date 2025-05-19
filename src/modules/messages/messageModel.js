import { query } from "../../db/db.js";

// Letar upp ett specifikt meddelande som tillhör en viss användare
export const fetchMessageById = async (msgId, userId) => {
  const { rows } = await query(
    `SELECT * FROM messages 
    WHERE message_id = $1
    AND user_id = $2`,
    [msgId, userId]
  );

  return rows; // Skickar tillbaka det hittade meddelandet (eller tomt resultat)
};

// Ändrar titel och innehåll för ett meddelande
export const updateMessageById = async (msgId, userId, { title, content }) => {
  const { rows } = await query(
    `UPDATE messages 
    SET title= $3, 
    content= $4, 
    updated_at= now() 
    WHERE message_id = $1
    AND user_id = $2 
    RETURNING *`, // Ger tillbaka det uppdaterade meddelandet
    [msgId, userId, title, content]
  );

  return rows;
};

// Tar bort ett meddelande från databasen
export const removeMessageById = async (msgId, userId) => {
  const { rows } = await query(
    `DELETE FROM messages 
    WHERE message_id = $1
    AND user_id = $2
    RETURNING *`, // Returnerar meddelandet som raderades
    [msgId, userId]
  );

  return rows;
};
