import { query } from "../../db/db.js";

export const createUser = async (firstname, lastname, username, email, password) => {
    const {rows} = await query(
        `INSERT INTO users
        (first_name, last_name, username, email, password)
        VALUES ($1, $2, $3, $4,$5)
        RETURNING *`
        , [firstname, lastname, username, email, password])

        return rows[0]
}

export const findUserByUsername = async (username) => {
  const { rows } = await query(
    `SELECT * FROM users WHERE username = $1`,
    [username]
  )
  return rows[0]
}


export const findUserById = async (userId) => {
  const { rows } = await query(
    `SELECT * FROM users WHERE user_id = $1`,
    [userId]
  )
  return rows[0]
}