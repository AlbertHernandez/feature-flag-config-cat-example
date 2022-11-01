import { EmailSender } from "../../domain/email-sender";

export class FakeEmailSender implements EmailSender {
  async sendMessage(email: string, text: string): Promise<void> {
    console.log(`[FakeEmailSender] - Sending email to "${email}": ${text}`);
  }
}
