const express = require("express");
const bodyParser = require("body-parser");
const Sse = require("json-sse");

const app = express();
const messages = [];
// const jsonparser= bodyParser.json()

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("hii"));
app.get("/message", (req, res) => res.send(messages));

app.post("/message", (req, res) => {
  const { message } = req.body; //bunu sor
  // const message = req.body.message
  messages.push(message);
  res.send(message);
});

const stream = new Sse();
//stream clients connected with stream. we make stream and connect client with stream when we send data sstream everyone reach them
//serieles = turn our data series of caractrers
app.get("/stream", (req, res, next) => {
  const string = JSON.stringify(messages);

  stream.updateInit(string);

  stream.init(req, res);
});

port = 4000;
app.listen(port, () => console.log("Server is running on port:" + port));
