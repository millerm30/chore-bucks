const express = require('express');
const PORT = process.env.PORT || 3010;
const cors = require('cors');
const app = express();
const { checkAndConnectDB } = require('./database/db');

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/jwtAuth'));

app.use('/api/dashboard', require('./routes/dashboard'));

app.use('/api/chores', require('./routes/chores'));

app.use('/api/wishes', require('./routes/wishes'));

app.use('/api/wallet', require('./routes/wallet'));

app.use('/api/cart', require('./routes/cart'));

app.use('/api/contact', require('./routes/contactus'));

checkAndConnectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});