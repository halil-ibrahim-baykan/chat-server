// const express = require("express");
// const bodyParser = require("body-parser");
// const Sse = require("json-sse");
// const cors = require("cors");

// const app = express();
// const stream = new Sse();
// const messages = [];
// // const jsonparser= bodyParser.json()\
// const rooms = [];

// app.use(cors());
// app.use(bodyParser.json());

// app.get("/", (req, res) => res.send("hii"));

// app.get("/stream", (req, res, next) => {
//   //   const string = JSON.stringify(messages);
// //   const messages = { a: 1, b: 2 };
//     const rooms = Object.keys(messages)

//   const string = JSON.stringify(rooms);

//   stream.updateInit(string);

//   stream.init(req, res);
// });

// function send(data) {
//   const string = JSON.stringify(data);
//   stream.send(string);
// }

// app.post("/room", (req, res, next) => {
//   const { name } = req.body;
//   send(name);
//   messages[name] = [];

//   // const string = JSON.stringify(name)
//   // stream.send(string)
//   // rooms.push(name);
//   streams[name] = new Sse();

//   res.send(name);
// });

// app.get("/message", (req, res) => res.send(messages));

// app.post("/message/:roomName", (req, res) => {
//   const { message } = req.body; //bunu sor
//   const { roomName } = req.params;
//   const room = messages[roomName];

//   room.push(message);
//   // const message = req.body.message
//   //   const string = JSON.stringify(message);

//   //   stream.send(string);\
//   send(message);

//   const stream = streams[roomName];
//   const string = JSON.stringify(message);

//   stream.send(string);
//   //   messages.push(message);
//   res.send(message);
// });

// const messages = {};

// //stream clients connected with stream. we make stream and connect client with stream when we send data sstream everyone reach them
// //serieles = turn our data series of caractrers

// port = 4000;
// app.listen(port, () => console.log("Server is running on port:" + port));

const express = require("express");
const bodyParser = require("body-parser");
const Sse = require("json-sse");
const cors = require("cors");

const app = express();

const corsMiddleware = cors();
app.use(corsMiddleware);

const jsonParser = bodyParser.json();
app.use(jsonParser);

const port = 4000;

app.get("/", (request, response, next) => {
  response.send("hello world");
});

const stream = new Sse();

const streams = {};

app.get("/stream", (request, response, next) => {
  // const messages = { a: 1, b: 2 }
  const rooms = Object.keys(messages);
  // rooms === ['a', 'b']

  const string = JSON.stringify(rooms);

  stream.updateInit(string);

  stream.init(request, response);
});

app.get("/rooms/:roomName", (request, response, next) => {
  const { roomName } = request.params;
  // roomName === 'fun'

  const stream = streams[roomName];

  // const messages = {
  //   fun: ['I'm having fun', 'me too']
  // }
  const data = messages[roomName];
  // data === ['I'm having fun', 'me too']

  const string = JSON.stringify(data);

  stream.updateInit(string);

  stream.init(request, response);
});

function send(data) {
  const string = JSON.stringify(data);

  stream.send(string);
}

app.post("/room", (request, response, next) => {
  const { name } = request.body;

  send(name);

  messages[name] = [];
  // messages.room = []
  // messags.fun = []

  streams[name] = new Sse();

  response.send(name);
});

const messages = {};
// {
//   name: ['hi', 'hello', 'goodbye'],
//   fun: ['we are having fun', 'so much fun']
// }

app.get("/message", (request, response, next) => {
  response.send(messages);
});

app.post("/streams/:roomName", (request, response, next) => {
  const { message } = request.body;
  const { roomName } = request.params;

  const room = messages[roomName];

  room.push(message);

  const stream = streams[roomName];

  const string = JSON.stringify(message);

  stream.send(string);

  response.send(message);
});

app.listen(port, () => console.log(`Listening on ${port}`));
