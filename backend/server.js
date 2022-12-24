const express = require('express');
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const app = express();
const shared = require('shared');

app.use(cors());
app.use(express.json());

// Routes //
// Register and Login Routes
app.use('/auth', require('./routes/jwtAuth'));

// Dashboard Route
app.use('/dashboard', require('./routes/dashboard'));

// Chores Route
app.use('/chores', require('./routes/chores'));

// Wishes Route
app.use('/wishes', require('./routes/wishes'));

// Wallet Route
app.use('/wallet', require('./routes/wallet'));

// Cart Route
app.use('/cart', require('./routes/cart'));

// Contact Us Route
app.use('/contact', require('./routes/contactus'));

// PORT //
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});