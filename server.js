const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json()); 

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB подключен'))
  .catch(err => console.error(err));

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Сервер работает');
});

const PORT = process.env.PORT || 5080;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
