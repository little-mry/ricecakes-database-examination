import {
  createUser,
  findUserById,
  findUserByUsername,
} from "./userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUpUser = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;

  try {
    const existing = await findUserByUsername(username);
    if (existing) {
      return res
        .status(409)
        .json({ success: false, error: "Användarnamn upptaget" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser(
      firstname,
      lastname,
      username,
      email,
      hashedPassword
    );
    delete newUser.password;

    return res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Serverfel",
    });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res
        .status(401)
        .json({ error: "Ogiltig användarnamn eller lösenord" });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return res
        .status(401)
        .json({ error: "Ogiltig användarnamn eller lösenord" });
    }

    const token = jwt.sign(
      { id: user.user_id, username: user.username },
      process.env.JWT_SECRET || "dinHemligaNyckel",
      { expiresIn: "3h" }
    );
    console.log("token-userid:", user.user_id);

    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.user_id,
          username: user.username,
          email: user.email,
        },
        token: token,
        expiresIn: "3h",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Serverfel",
    });
  }
};

export const getUserInfo = async (req, res) => {
  const {userId} = req.params;

  try {
  const user = await findUserById(userId)
    if (!user) {
      return res
        .status(401)
        .json({ error: `Hittade ingen användare med id ${userId}`  });
    }

    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.user_id,
          username: user.username,
          email: user.email,
          firstname: user.first_name,
          lastname: user.last_name,
          createdAt: user.created_at,
          updatedAt: user.updated_at
        }
      },
    });


  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Serverfel",
    });
  }
};
