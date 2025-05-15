import { createUser, findUserById, fetchUserChannels } from "./userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signUpUser = async (req, res) => {
    const {firstname, lastname, username, email, password} = req.body
    
    try {
        const newUser = await createUser(firstname, lastname, username, email, password)
        return res.status(201).json({
            success: true,
            data: newUser
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Serverfel"
        })
    }
    
}

export const loginUser = async (req, res) => {
    try {
        
    } catch (error) {
         console.error(error);
        res.status(500).json({
            success: false,
            error: "Serverfel"
        })
    }
}

export const getUserChannels = async (req, res) => {

}