import { runMigration } from "./migrate.js";
import express from "express";
import channelRoute from "./modules/channels/channelRoutes.js";
import messageRoute from "./modules/messages/messagesRoutes.js";
import subscriptionRoute from "./modules/subscriptions/subsriptionRouter.js";
import userRoute from "./modules/users/userRoutes.js";

const port = process.env.PORT || 3030;

// Funktion som startar servern
const startServer = async () => {
  // Säkerställer att alla nödvändiga tabeller finns i databasen
  await runMigration();

  const app = express();
  app.use(express.json());

  // Registrerar routes för varje del av API:et
  app.use("/users", userRoute);
  app.use("/subscriptions", subscriptionRoute);
  app.use("/channels", channelRoute);
  app.use("/messages", messageRoute);

  //Startar servern och lyssnar på angiven port
  app.listen(port, () => {
    console.log(`Servern körs på http://localhost:${port}`);
  });
};

startServer();
