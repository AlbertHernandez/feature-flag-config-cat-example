export interface SlackSender {
  sendMessage(slackUserId: string, text: string): Promise<void>;
}
