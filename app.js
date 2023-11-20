const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("./models/contacts");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// app.use("/api/contacts", contactsRouter);

app.get("/api/contacts", async (req, res) => {
  const contacts = await listContacts();
  res.json(contacts);
});

app.get("/api/contacts/:id", async (req, res) => {
  const contactId = req.params.id;

  const contact = await getContactById(contactId);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

app.use(bodyParser.json());

// POST
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

// DELETE endpoint for deleting a contact by ID
app.delete("/api/contacts/:id", async (req, res) => {
  try {
    const deletedContact = await removeContact(contactId);

    res.json({ message: "Contact deleted" });
  } catch (error) {
    if (error.message === "Contact not found") {
      res.status(404).json({ message: "Not found" });
    } else {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// PUT
app.put("/api/contacts/:id", async (req, res) => {
  try {
    const contactId = req.params.id;
    const updatedFields = req.body;

    if (!updatedFields || Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const updatedContact = await updateContact(contactId, updatedFields);

    res.json(updatedContact);
  } catch (error) {
    if (error.message === "Contact not found") {
      res.status(404).json({ message: "Not found" });
    } else {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
