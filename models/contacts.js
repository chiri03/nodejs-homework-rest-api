const fs = require("fs").promises;

const path = "./models/contacts.json";

const listContacts = async () => {
  try {
    const jsonContent = await fs.readFile(path, "utf-8");
    return JSON.parse(jsonContent);
  } catch (error) {
    throw new Error("Error reading JSON file: " + error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const jsonContent = await listContacts();

    const selectedItem = jsonContent.find(
      (contact) => contact.id === contactId
    );

    return selectedItem;
  } catch (error) {
    throw new Error("Error reading JSON file: " + error.message);
  }
};

const addContact = async (body) => {};

const removeContact = async (contactId) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
