import express from 'express';
import cors from 'cors';
import { checkAndConnectDB } from './database/db.js';
import jwtAuthRouter from './routes/jwtAuth.js';
import dashboardRouter from './routes/dashboard.js';
import choresRouter from './routes/chores.js';
import wishesRouter from './routes/wishes.js';
import walletRouter from './routes/wallet.js';
import cartRouter from './routes/cart.js';
import contactUsRouter from './routes/contactus.js';

const PORT = process.env.PORT || 3010;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', jwtAuthRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/chores', choresRouter);
app.use('/api/wishes', wishesRouter);
app.use('/api/wallet', walletRouter);
app.use('/api/cart', cartRouter);
app.use('/api/contact', contactUsRouter);

checkAndConnectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});