const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  return res.json({ message: "Hello from nodeJS docker container" });
});

app.listen(PORT, () => console.log("Node server is running!"));
