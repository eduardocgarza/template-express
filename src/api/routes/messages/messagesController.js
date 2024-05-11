import express from "express";
const messagesController = express.Router();

import createMessageHandler from "./routes/createMessage.js";
import updateMessageHandler from "./routes/updateMessage.js";
import activateMessageHandler from "./routes/activateMessage.js";
import deactivateMessageHandler from "./routes/deactivateMessage.js";
import deleteMessageHandler from "./routes/deleteMessage.js";

messagesController.post("/", createMessageHandler);
messagesController.put("/:messageID", updateMessageHandler);
messagesController.delete("/:messageID", deleteMessageHandler);
messagesController.put("/:messageID/activate", activateMessageHandler);
messagesController.put("/:messageID/deactivate", deactivateMessageHandler);

export default messagesController;
