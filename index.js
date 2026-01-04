const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const DBconnect = require('./config/db');
const userRoutes = require('./routes/user.routes');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan('dev'));



app.use(express.static(path.join(__dirname, 'public')));

DBconnect();

app.use('/api/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});