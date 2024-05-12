import AppLogger from "../../../modules/LoggerModule/AppLogger.js";
import TwilioSMSNotifications from "../../../modules/SMSNotificationsModule/providers/TwilioSMSNotifications.js";
import SendGridEmailNotifications from "../../../modules/EmailNotificationsModule/providers/SendGridEmailNotifications.js";

const FILE_NAME = "[getRootHandler.js]";


export default async function getRootHandler(req, res) {
  AppLogger.info(`${FILE_NAME} - Start - Get Root Route Handler`);

  // SMS - Twilio
  const twilioSender = new TwilioSMSNotifications();
  await twilioSender.send("Hello World");
  AppLogger.info(`${FILE_NAME} - Message Sent`);

  // Email - SendGrid
  const sendgridSender = new SendGridEmailNotifications()
  await sendgridSender.send("Hello World");
  AppLogger.info(`${FILE_NAME} - Email Sent`);

  return res.json({
    status: "success",
  });
}
