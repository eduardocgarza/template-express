import express from "express";
const messagesController = express.Router();

import createMessageHandler from "./routes/createMessage/createMessage.js";
import updateMessageHandler from "./routes/updateMessage/updateMessage.js";
import activateMessageHandler from "./routes/activateMessage/activateMessage.js";
import deactivateMessageHandler from "./routes/deactivateMessage/deactivateMessage.js";
import deleteMessageHandler from "./routes/deleteMessage/deleteMessage.js";
import validateAccountID from "../accounts/shared/validateAccountID.js";
import createMessageSchema from "./routes/createMessage/createMessageSchema.js";
import updateMessageSchema from "./routes/updateMessage/updateMessageSchema.js";

messagesController.post("/", createMessageSchema, createMessageHandler);
messagesController.put("/:messageID", validateAccountID, updateMessageSchema, updateMessageHandler);
messagesController.delete("/:messageID", validateAccountID, deleteMessageHandler);
messagesController.put("/:messageID/activate", validateAccountID, activateMessageHandler);
messagesController.put("/:messageID/deactivate", validateAccountID, deactivateMessageHandler);

export default messagesController;
