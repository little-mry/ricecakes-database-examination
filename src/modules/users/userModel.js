import { query } from "../../db/db.js";

export const createUser = async (firstname, lastname, username, email, password) => {
    const {rows} = await query(
        `INSERT INTO users
        (first_name, last_name, username, email, password)
        VALUES ($1, $2, $3, $4,$5)
        `, [firstname, lastname, username, email, password])
}
export const findUserById = async () => {

}
export const fetchUserChannels = async () => {

}