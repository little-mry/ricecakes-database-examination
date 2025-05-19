import { createUser, findUserById, findUserByUsername } from "./userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registrerar en ny användare
export const signUpUser = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;

  try {
    // Kollar om användarnamnet redan finns
    const existing = await findUserByUsername(username);
    if (existing) {
      return res.status(409).json({ success: false, error: "Användarnamn upptaget" });
    }
    // Hashar lösenordet innan det sparas i databasen
    const hashedPassword = await bcrypt.hash(password, 10);

    // Skapar ny användare i databasen
    const newUser = await createUser(firstname, lastname, username, email, hashedPassword);
    // Tar bort lösenordet innan vi skickar tillbaka användaren (av säkerhetsskäl)
    delete newUser.password;

    // Bekräftar att användaren har skapats och skickar tillbaka datan
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

// Loggar in en användare och skickar tillbaka en JWT-token
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Hämta användaren med angivet användarnamn
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: "Ogiltig användarnamn eller lösenord" });
    }
    // Jämför lösenordet med det hashade i databasen
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return res.status(401).json({ error: "Ogiltig användarnamn eller lösenord" });
    }
    // Skapar en JWT-token som gäller i 3 timmar
    const token = jwt.sign(
      { id: user.user_id, username: user.username },
      process.env.JWT_SECRET || "dinHemligaNyckel",
      { expiresIn: "3h" }
    );
    console.log("token-userid:", user.user_id);

    // Skickar tillbaka användarinfo och token
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

// Hämtar info om en specifik användare
export const getUserInfo = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await findUserById(userId);
    if (!user) {
      return res.status(401).json({ error: `Hittade ingen användare med id ${userId}` });
    }
    // Skickar tillbaka användarens information
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
          updatedAt: user.updated_at,
        },
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
