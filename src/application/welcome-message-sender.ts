import { EmailSender } from "../domain/email-sender";
import { UserByIdFinder } from "../domain/user-by-id-finder";
import { SlackSender } from "../domain/slack-sender";

export class WelcomeMessageSender {
  constructor(
    private readonly userByIdFinder: UserByIdFinder,
    private readonly emailSender: EmailSender,
    private readonly slackSender: SlackSender
  ) {}

  async sendToUser(userId: string): Promise<void> {
    console.debug(
      `[WelcomeMessageSender] - Sending welcome email to user: ${userId}`
    );

    const user = await this.userByIdFinder.run(userId);

    const message = "Welcome dev!";
    await this.emailSender.sendMessage(user.email, message);
    await this.slackSender.sendMessage(user.slackUserId, message);

    console.debug(
      "[WelcomeMessageSender] - Successfully sent the welcome message to the user"
    );
  }
}
