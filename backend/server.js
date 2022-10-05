const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const shared = require ('shared');

app.get("/", (req, res) => {
  res.json({ message: "You have your server running!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

shared.sayHello();