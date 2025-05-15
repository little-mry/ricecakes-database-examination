import { runMigration } from "./migrate.js";
import express from "express";
import channelRoute from './modules/channels/channelRoutes.js'
import messageRoute from './modules/messages/messagesRoutes.js'

const port = process.env.PORT || 3030;

const startServer = async () => {
  //Call to run the runMigration-function, has to be done before anything else can run
  await runMigration();

  const app = express();
  app.use(express.json());

  //
  app.use("/users", userRoute);
  app.use("/subscriptions", orderRoute);
  app.use("/channels", channelRoute);
  app.use("/messages", messageRoute);

  //Starts the server
  app.listen(port, () => {
    console.log(`Servern körs på http://:${port}`);
  });
};

startServer();
