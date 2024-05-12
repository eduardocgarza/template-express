import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"; 
import AppLogger from "../../LoggerModule/AppLogger.js";

const FILE_NAME = "[AmazonSESEmailNotifications.js]";

export default class AmazonSESEmailNotifications {
  static SUBJECT = "App Notification";

  constructor() {
    const awsRegion = process.env.AWS_SES_REGION;
    const awsAccessKey = process.env.AWS_SES_ACCESS_KEY
    const awsSecretAccessKey = process.env.AWS_SES_SECRET_ACCESS_KEY

    if (!awsRegion || !awsAccessKey || !awsSecretAccessKey) {
      const errorMessage = `${FILE_NAME} - AWS Credentials Missing: [${awsRegion}] [${awsAccessKey}] [${awsSecretAccessKey}]`;
      AppLogger.error(errorMessage);
      throw new Error(errorMessage);
    }

    this.client = new SESClient({
      apiVersion: "2010-12-01",
      region: awsRegion,
      credentials: {
        accessKeyId: awsAccessKey,
        secretAccessKey: awsSecretAccessKey,
      },
    });
  }

  async send(message) {
    const input = {
      Destination: {
        ToAddresses: [process.env.AWS_RECEIVER_EMAIL],
      },
      Message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: message,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: AmazonSESEmailNotifications.SUBJECT,
        },
      },
      Source: process.env.AWS_SENDER_EMAIL,
    };
    const command = new SendEmailCommand(input);
    const response = await this.client.send(command);
    
    AppLogger.info(`${FILE_NAME} - Email Sent: ${response}`);
    return response;
  }
}
