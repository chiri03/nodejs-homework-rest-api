const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const { listContacts, getContactById } = require("./models/contacts");

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

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
