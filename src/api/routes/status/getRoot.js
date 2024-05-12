import AppLogger from "../../../modules/LoggerModule/AppLogger.js";
import SMSNotifications from "../../../modules/SMSNotificationsModule/SMSNotifications.js";

const FILE_NAME = "[getRootHandler.js]";

export default async function getRootHandler(req, res) {
  AppLogger.info(`${FILE_NAME} - Start - Get Root Route Handler`);

  const sender = new SMSNotifications();
  await sender.sendSMS("Hello World");
  AppLogger.info(`${FILE_NAME} - Message Sent`);

  return res.json({
    status: "success",
  });
}
