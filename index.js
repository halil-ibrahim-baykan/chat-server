const express = require("express");

const app = express();
app.get("/", (req, res) => res.send("hii"));
port = 4000;
app.listen(port, () => console.log("Server is running on port:" + port));
