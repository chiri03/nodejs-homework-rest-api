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

const addContact = async (body) => {
  app.post("/api/contacts", async (req, res) => {
    try {
      const { name, email, phone } = req.body;

      if (!name || !email || !phone) {
        return res
          .status(400)
          .json({ message: "Missing required name, email, or phone field" });
      }

      const addedContact = await addContact({ name, email, phone });

      res.status(201).json(addedContact);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

const removeContact = async (id) => {
  try {
    const index = contacts.findIndex((contact) => contact.id === parseInt(id));

    if (index !== -1) {
      const deletedContact = contacts.splice(index, 1)[0];

      await fs.writeFile(
        "contacts.json",
        JSON.stringify(contacts, null, 2),
        "utf-8"
      );

      return deletedContact;
    } else {
      throw new Error("Contact not found");
    }
  } catch (error) {
    throw new Error("Error removing contact: " + error.message);
  }
};

const updateContact = async (id, updatedFields) => {
  try {
    const index = contacts.findIndex((contact) => contact.id === parseInt(id));

    if (index !== -1) {
      contacts[index] = { ...contacts[index], ...updatedFields };

      await fs.writeFile(
        "contacts.json",
        JSON.stringify(contacts, null, 2),
        "utf-8"
      );

      return contacts[index];
    } else {
      throw new Error("Contact not found");
    }
  } catch (error) {
    throw new Error("Error updating contact: " + error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
