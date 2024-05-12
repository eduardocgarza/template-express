import MySQLClient from "../MySQLClient.js";
import AppLogger from "../../../../LoggerModule/AppLogger.js";

export default class Message {

  constructor(messageData) {
    this.id = messageData["id"] || null;
    this.message = messageData["message"] || null;
    this.accountID = messageData["accountID"] || null;
    this.dateCreated = messageData["dateCreated"] || null;
    this.lastModified = messageData["lastModified"] || null;
  }

  async create() {
    try {
      const client = new MySQLClient();
      await client.connect();

      const query = `
        INSERT INTO messages (message, account_id) VALUES (?, ?);
      `;
      const values = [this.message, this.accountID];
      const result = await client.query(query, values);
      this.id = result.insertId;

      // Retrieve the created message to update all properties including defaults
      await this.refresh();
    } catch (error) {
      AppLogger.error(`Error creating message: ${error.message}`);
      throw new Error(`Error creating message: ${error.message}`);
    }
  }

  async update(updates) {
    if (!this.id) throw new Error("No message ID provided for update.");

    const fieldsToUpdate = Object.entries(updates)
      .filter(([_, value]) => value !== null)
      .map(([key, value]) => [
        key.replace(/([A-Z])/g, "_$1").toLowerCase(),
        value,
      ]);

    if (fieldsToUpdate.length === 0) throw new Error("No updates provided.");

    try {
      const client = new MySQLClient();
      await client.connect();

      const updateParts = fieldsToUpdate.map(([field, _]) => `${field} = ?`);
      const values = fieldsToUpdate.map(([_, value]) => value);
      values.push(this.id);

      const query = `
        UPDATE messages
        SET ${updateParts.join(", ")}
        WHERE id = ?;
    `;

      await client.query(query, values);
      await this.refresh(); // Refresh the object after update
    } catch (error) {
      AppLogger.error(`Error updating message: ${error.message}`);
      throw new Error(`Error updating message: ${error.message}`);
    }
  }

  async delete() {
    if (!this.id) throw new Error("No message ID provided for deletion.");

    try {
      const client = new MySQLClient();
      await client.connect();

      const query = `
        DELETE 
        FROM messages 
        WHERE id = ?;
    `;
      const values = [this.id];

      await client.query(query, values);
    } catch (error) {
      AppLogger.error(`Error deleting message: ${error.message}`);
      throw new Error(`Error deleting message: ${error.message}`);
    }
  }

  async activate() {
    await this.updateField("active", true);
  }

  async deactivate() {
    await this.updateField("active", false);
  }

  async updateField(field, value) {
    if (!this.id)
      throw new Error(`No message ID provided for updating field ${field}.`);

    try {
      const client = new MySQLClient();
      await client.connect();

      const query = `
          UPDATE messages
          SET ${field} = ?
          WHERE id = ?;
      `;
      const values = [value, this.id];

      await client.query(query, values);
      this[field] = value; // Update local state
    } catch (error) {
      AppLogger.error(
        `Error updating message field ${field}: ${error.message}`
      );
      throw new Error(
        `Error updating message field ${field}: ${error.message}`
      );
    }
  }

  async refresh() {
    try {
      const client = new MySQLClient();
      await client.connect();

      const query = `
          SELECT * 
          FROM messages 
          WHERE id = ?;
      `;
      const values = [this.id];
      const [result] = await client.query(query, values);

      if (result) {
        this.message = result.message;
        this.accountID = result.account_id;
        this.dateCreated = new Date(result.date_created);
        this.lastModified = new Date(result.last_modified);
        this.active = Boolean(result.active);
      }
    } catch (error) {
      AppLogger.error(`Error refreshing message: ${error.message}`);
      throw new Error(`Error refreshing message: ${error.message}`);
    }
  }
}
