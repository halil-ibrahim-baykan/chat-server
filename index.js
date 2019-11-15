const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const messages = [];
// const jsonparser= bodyParser.json()
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("hii"));

app.post("/message", (req, res) => {
  const { message } = req.body; //bunu sor
  messages.push(message);
  res.send(message);
});

port = 4000;
app.listen(port, () => console.log("Server is running on port:" + port));
