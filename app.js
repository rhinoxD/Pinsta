const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 5000;
const { MONGOURI } = require('./keys');

mongoose.connect(MONGOURI);
mongoose.connection.on('connected', () => {
  console.log('Connected to Mongo');
});
mongoose.connection.on('error', (err) => {
  console.log('Error Connecting', err);
});

require('./models/user');
require('./models/post');

app.use(express.json());
app.use(cors());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
