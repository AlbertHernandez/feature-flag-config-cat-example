import { EmailSender } from "../domain/email-sender";
import { UserByIdFinder } from "../domain/user-by-id-finder";
import { SlackSender } from "../domain/slack-sender";
import {
  FeatureFlagChecker,
  FeatureFlags,
} from "../domain/feature-flag-checker";

export class WelcomeMessageSender {
  constructor(
    private readonly userByIdFinder: UserByIdFinder,
    private readonly emailSender: EmailSender,
    private readonly slackSender: SlackSender,
    private readonly featureFlagChecker: FeatureFlagChecker
  ) {}

  async sendToUser(userId: string): Promise<void> {
    console.debug(
      `[WelcomeMessageSender] - Sending welcome email to user: ${userId}`
    );

    const user = await this.userByIdFinder.run(userId);

    const message = "Welcome dev!";
    await this.emailSender.sendMessage(user.email, message);

    const isSlackSenderEnabled = await this.featureFlagChecker.isEnabled(
      FeatureFlags.SlackWelcomeMessage,
      false
    );

    if (isSlackSenderEnabled) {
      await this.slackSender.sendMessage(user.slackUserId, message);
    }

    console.debug(
      "[WelcomeMessageSender] - Successfully sent the welcome message to the user"
    );
  }
}
