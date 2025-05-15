import { runMigration } from "./migrate.js";
import express from "express";
import channelRoute from "./modules/channels/channelRoutes.js";
import messageRoute from "./modules/messages/messagesRoutes.js";
import subscriptionRoute from "./modules/subscriptions/subsriptionRouter.js";
import userRoute from "./modules/users/userRoutes.js";

const port = process.env.PORT || 3030;

const startServer = async () => {
  await runMigration();

  const app = express();
  app.use(express.json());

  app.use("/users", userRoute);
  app.use("/subscriptions", subscriptionRoute);
  app.use("/channels", channelRoute);
  app.use("/messages", messageRoute);

  //Starts the server
  app.listen(port, () => {
    console.log(`Servern körs på http://localhost:${port}`);
  });
};

startServer();
