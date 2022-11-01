import { SlackSender } from "../../domain/slack-sender";

export class FakeSlackSender implements SlackSender {
  async sendMessage(slackUserId: string, text: string): Promise<void> {
    console.log(
      `[FakeSlackSender] - Sending slack to "${slackUserId}": ${text}`
    );
  }
}
