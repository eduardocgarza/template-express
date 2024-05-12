import MySQLClient from "../MySQLClient.js";
import AppLogger from "./../../../../LoggerModule/AppLogger.js";

export default class Account {
  constructor(accountData) {
    this.id = accountData["id"] || null;
    this.firstName = accountData["firstName"] || null;
    this.lastName = accountData["lastName"] || null;
    this.email = accountData["email"] || null;
    this.password = accountData["password"] || null;
    this.dateCreated = accountData["dateCreated"] || null;
    this.lastModified = accountData["lastModified"] || null;
    this.verified = accountData["verified"] || null;
    this.active = accountData["active"] || null;
    this.deleted = accountData["deleted"] || null;
    this.messages = accountData["messages"] || [];
  }

  async create() {
    try {
      const client = new MySQLClient();
      await client.connect();

      const insertQuery = `
          INSERT INTO accounts (
            first_name, 
            last_name, 
            email, 
            password
          ) VALUES (?, ?, ?, ?);
      `;
      const insertValues = [
        this.firstName,
        this.lastName,
        this.email,
        this.password,
      ];
      const result = await client.query(insertQuery, insertValues);
      this.id = result.insertId;

      // Retrieve all fields including defaults set by the database
      const selectQuery = `
          SELECT * 
          FROM accounts 
          WHERE id = ? AND deleted = 0;
      `;
      const selectValues = [this.id];
      const [accountData] = await client.query(selectQuery, selectValues);

      // Update object properties with data retrieved from the database
      this.dateCreated = new Date(accountData.date_created);
      this.lastModified = new Date(accountData.last_modified);
      this.verified = Boolean(accountData.verified);
      this.active = Boolean(accountData.active);
      this.deleted = Boolean(accountData.deleted);
    } catch (error) {
      const errorMessage = `Error creating account: ${error.message}`;
      AppLogger.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async get() {
    try {
      const client = new MySQLClient();
      await client.connect();

      const query = `
        SELECT * 
        FROM accounts 
        WHERE id = ?;
      `;
      const values = [this.id];
      const [result] = await client.query(query, values);
      AppLogger.info(`Account retrieved: ${result}`);

      if (result) {
        AppLogger.info(`Account retrieved: ${result}`);
        
        this.firstName = result.first_name;
        this.lastName = result.last_name;
        this.email = result.email;
        this.password = result.password; // Note: Typically you wouldn't retrieve the password
        this.dateCreated = result.date_created;
        this.lastModified = result.last_modified;
        this.verified = Boolean(result.verified);
        this.active = Boolean(result.active);
        this.deleted = Boolean(result.deleted);
      }

      // Get All Messages for this Account ID
      const messagesQuery = `
        SELECT *
        FROM messages
        WHERE account_id = ?;
      `;
      const messagesValues = [this.id];
      const messages = await client.query(messagesQuery, messagesValues);

      this.messages = messages.map((message) => ({
        id: message.id,
        message: message.message,
        dateCreated: message.date_created,
        lastModified: message.last_modified,
        active: Boolean(message.active),
      }));
      
      return result;
    } catch (error) {
      const errorMessage = `Error retrieving account: ${error.message}`;
      AppLogger.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  toSnakeCase(str) {
    return str.replace(/([A-Z])/g, (letter) => `_${letter.toLowerCase()}`);
  }

  async update(updates) {
    // Filter and convert updates to snake_case keys
    const fieldsToUpdate = Object.entries(updates)
      .filter(([key, value]) => value != null)
      .map(([key, value]) => [this.toSnakeCase(key), value]);

    if (fieldsToUpdate.length === 0) {
      throw new Error("No valid fields provided for update.");
    }

    try {
      const client = new MySQLClient();
      await client.connect();

      // Build the query dynamically based on provided updates
      const updateParts = fieldsToUpdate.map(([field, _]) => `${field} = ?`);
      const values = fieldsToUpdate.map(([_, value]) => value);
      values.push(this.id); // Include the id at the end for the WHERE clause

      const query = `
          UPDATE accounts
          SET ${updateParts.join(", ")}
          WHERE id = ? AND deleted = 0;
      `;

      await client.query(query, values);

      // Update local object state to reflect changes using camelCase keys
      fieldsToUpdate.forEach(([field, value]) => {
        let camelCaseKey = field.replace(/_([a-z])/g, (group) =>
          group[1].toUpperCase()
        );
        this[camelCaseKey] = value;
      });
    } catch (error) {
      const errorMessage = `Error updating account: ${error.message}`;
      AppLogger.error(errorMessage);
      throw new Error(errorMessage);
    } 
  }

  async delete() {
    await this.updateField("deleted", true);
  }

  async activate() {
    await this.updateField("active", true);
  }

  async deactivate() {
    await this.updateField("active", false);
  }

  async updateField(field, value) {
    try {
      const client = new MySQLClient();
      await client.connect();

      const query = `
          UPDATE accounts 
          SET ${field} = ? 
          WHERE id = ?;
        `;
      const values = [value, this.id];
      await client.query(query, values);

      // Update the local object to reflect the change
      this[field] = value;
    } catch (error) {
      const errorMessage = `Error updating field '${field}': ${error.message}`;
      AppLogger.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
}
