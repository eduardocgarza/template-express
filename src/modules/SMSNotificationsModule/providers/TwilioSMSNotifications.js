import twilio from "twilio";
import AppLogger from "../../LoggerModule/AppLogger.js";

export default class TwilioSMSNotifications {
  constructor() {
    const twilioAccountSID = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

    if (!twilioAccountSID || !twilioAuthToken) {
      errorMessage = `Twilio Environment Variables Not Set: TWILIO_ACCOUNT_SID: ${twilioAccountSID}, TWILIO_AUTH_TOKEN: ${twilioAuthToken}`;
      AppLogger.error(errorMessage);
      throw new Error(errorMessage);
    }

    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }

  async send(message) {
    try {
      const response = await this.client.messages.create({
        body: message,
        from: process.env.TWILIO_SENDER_PHONE_NUMBER,
        to: process.env.TWILIO_RECEIVER_PHONE_NUMBER,
      });
      AppLogger.info(`SMS Sent: ${response.sid}`);
    } catch (error) {
      AppLogger.error(`SMS Error: ${error}`);
    }
  }
}
