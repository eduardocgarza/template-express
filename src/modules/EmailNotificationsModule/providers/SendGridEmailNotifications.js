import sgMail from "@sendgrid/mail";
import AppLogger from "../../LoggerModule/AppLogger.js";


const FILE_NAME = "[SendGridEmailNotifications.js]";


export default class SendGridEmailNotifications {
  static SUBJECT = "App Notification";

  constructor() {
    const sendgridAPIKey = process.env.SENDGRID_API_KEY;
    if (!sendgridAPIKey) {
      const errorMessage = `SendGrid API Key Not Found: ${sendgridAPIKey}`;
      AppLogger.error(`${FILE_NAME} - ${errorMessage}`);
      throw new Error(errorMessage);
    }
    
    sgMail.setApiKey(sendgridAPIKey);
    AppLogger.info(`${FILE_NAME} - SendGridEmailNotifications initialized`);
  }

  async send(message) {
    AppLogger.info(`${FILE_NAME} - Start - Send Email`);
    const senderEmail = process.env.SENDGRID_SENDER_EMAIL
    const receiverEmail = process.env.SENDGRID_RECEIVER_EMAIL

    if(!senderEmail || !receiverEmail){
      const errorMessage = `Sender or Receiver Email Not Found: ${senderEmail} - ${receiverEmail}`;
      AppLogger.error(`${FILE_NAME} - ${errorMessage}`);
      throw new Error(errorMessage);
    }

    AppLogger.info(`${FILE_NAME} - Sender Email: ${senderEmail}`);
    AppLogger.info(`${FILE_NAME} - Receiver Email: ${receiverEmail}`);
    
    try {
      const msg = {
        from: senderEmail,
        to: receiverEmail,
        subject: SendGridEmailNotifications.SUBJECT,
        text: message,
        html: message,
      };
      const response = await sgMail.send(msg);
      AppLogger.info(`${FILE_NAME} - Email Sent: ${response}`);
      return response;
    }
    catch (error) {
      const errorMessage = `${FILE_NAME} - Error Sending Email: ${error}`;
      AppLogger.error(errorMessage);
      throw new Error(error);
    }
  }
}
