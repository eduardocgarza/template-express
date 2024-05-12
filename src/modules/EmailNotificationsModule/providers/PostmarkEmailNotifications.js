import postmark from "postmark";
import AppLogger from "../../LoggerModule/AppLogger.js";

const FILE_NAME = "[PostmarkEmailNotifications.js]";

export default class PostmarkEmailNotifications {
  static SUBJECT = "App Notification";

  constructor() {
    const serverAPIToken = process.env.POSTMARK_SERVER_API_TOKEN;

    if (!serverAPIToken) {
      const errorMessage = `${FILE_NAME} - Postmark Server API Token is Missing: ${serverAPIToken}`;
      AppLogger.error(errorMessage);
      throw new Error(errorMessage);
    }

    this.client = new postmark.ServerClient(serverAPIToken);
  }

  async send(message) {
    const response = await this.client.sendEmail({
      From: process.env.POSTMARK_SENDER_EMAIL,
      To: process.env.POSTMARK_RECEIVER_EMAIL,
      Subject: PostmarkEmailNotifications.SUBJECT,
      TextBody: message,
    });
    AppLogger.info(`${FILE_NAME} - Email Sent: ${response}`);
    return response;
  }
}
