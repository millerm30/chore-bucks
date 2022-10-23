const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const shared = require ('shared');
const path = require('path');

const static_dir = path.join(__dirname, '/client/build');

app.use('/', express.static(static_dir));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

shared.sayHello();