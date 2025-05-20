import jwt from "jsonwebtoken";

// Middleware för att verifiera JWT-token och identifiera användaren
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Åtkomst nekad, token saknas" });
  }

  // Plockar ut själva token (efter "Bearer ")
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Åtkomst nekad, token saknas" });
  }

  try {
    // Verifierar token med den superhemliga nyckeln
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "yourSecretKey"
    );
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error vid tokenverifiering: ", error);
    return res.status(401).json({ error: "Ogiltig token" });
  }
};

export default authMiddleware;
