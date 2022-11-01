import express from "express";
import { WelcomeMessageSender } from "../../application/welcome-message-sender";

export class UsersController {
  constructor(private readonly welcomeMessageSender: WelcomeMessageSender) {}

  async sendWelcomeMessage(req: express.Request, res: express.Response) {
    await this.welcomeMessageSender.sendToUser(req.params.id);
    res.status(200).send();
  }
}
