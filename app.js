const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;
const { MONGOURI } = require('./keys');

require('./models/user');

app.use(express.json());
app.use(require('./routes/auth'));

mongoose.connect(MONGOURI);
mongoose.connection.on('connected', () => {
  console.log('Connected to Mongo');
});
mongoose.connection.on('error', (err) => {
  console.log('Error Connecting', err);
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
