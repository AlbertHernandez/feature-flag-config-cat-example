import express from "express";
import { usersController } from "../dependencies";

const usersRouter = express.Router();

usersRouter.post(
  "/:id/welcome",
  usersController.sendWelcomeMessage.bind(usersController)
);

export { usersRouter };
