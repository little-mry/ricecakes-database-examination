import { query } from "../../db/db";

export const fetchMessageById = async (msgId, userId) => {
  const { rows } = await query(
    `SELECT * FROM messages 
    WHERE message_id = $1
    AND user_id = $2`,
    [msgId, userId]
  );

  return rows;
};

export const updateMessageById = async (msgId, userId, { title, content }) => {
  const { rows } = await query(
    `UPDATE messages 
    SET title= $3, 
    content= $4, 
    updated_at= now() 
    WHERE message_id = $1
    AND user_id = $2 
    RETURNING *`,
    [msgId, userId, title, content]
  );

  return rows;
};

export const removeMessageById = async (msgId, userId) => {
  const { rows } = await query(
    `DELETE FROM messages 
    WHERE message_id = $1
    AND user_id = $2
    RETURNING *`,
    [msgId, userId]
  );

  return rows;
};
