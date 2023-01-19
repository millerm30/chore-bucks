const express = require('express');
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const app = express();
const shared = require('shared');
const { checkAndConnectDB } = require('./database/db');

app.use(cors());
app.use(express.json());

app.use('/auth', require('./routes/jwtAuth'));

app.use('/dashboard', require('./routes/dashboard'));

app.use('/chores', require('./routes/chores'));

app.use('/wishes', require('./routes/wishes'));

app.use('/wallet', require('./routes/wallet'));

app.use('/cart', require('./routes/cart'));

app.use('/contact', require('./routes/contactus'));

checkAndConnectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});