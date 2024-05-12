import AppLogger from "../../../modules/LoggerModule/AppLogger.js";
import TwilioSMSNotifications from "../../../modules/SMSNotificationsModule/providers/TwilioSMSNotifications.js";
import SendGridEmailNotifications from "../../../modules/EmailNotificationsModule/providers/SendGridEmailNotifications.js";
import PostmarkEmailNotifications from "../../../modules/EmailNotificationsModule/providers/PostmarkEmailNotifications.js";
import AmazonSESEmailNotifications from "../../../modules/EmailNotificationsModule/providers/AmazonSESEmailNotifications.js";

const FILE_NAME = "[getRootHandler.js]";

const sendConfig = {
  sendTwilio: true,
  sendSendGrid: true,
  sendPostmark: false, // Pending Approval
  sendAmazon: true
};

export default async function getRootHandler(req, res) {
  AppLogger.info(`${FILE_NAME} - Start - Get Root Route Handler`);

  // SMS - Twilio
  if (sendConfig.sendTwilio) {
    const twilioSender = new TwilioSMSNotifications();
    await twilioSender.send("Hello World");
    AppLogger.info(`${FILE_NAME} - SMS Sent`);
  }

  // Email - SendGrid
  if (sendConfig.sendSendGrid) {
    const sendgridSender = new SendGridEmailNotifications();
    await sendgridSender.send("Hello World");
    AppLogger.info(`${FILE_NAME} - Email Sent`);
  }

  // Email - Postmark
  if (sendConfig.sendPostmark) {
    const postmarkSender = new PostmarkEmailNotifications();
    await postmarkSender.send("Hello World");
    AppLogger.info(`${FILE_NAME} - Email Sent`);
  }

  // Email - Amazon SES
  if (sendConfig.sendAmazon) {
    const amazonSender = new AmazonSESEmailNotifications();
    await amazonSender.send("Hello World");
    AppLogger.info(`${FILE_NAME} - Email Sent`);
  }

  return res.json({
    status: "success",
  });
}
