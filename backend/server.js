const express = require('express');
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const app = express();
const shared = require ('shared');
const path = require('path');

app.use(cors());
app.use(express.json());

//const static_dir = path.join(__dirname, '../frontend/build');

//app.use('/', express.static(static_dir));

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname,'frontend', 'build', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

console.log(static_dir);

shared.sayHello();