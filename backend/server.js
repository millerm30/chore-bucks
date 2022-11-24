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

// PORT //
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});