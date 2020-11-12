const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routers');
const mongoose = require('mongoose');
const Property = require('./models/property');

app.use(cors());
app.use(express.json());
app.use('/api', router);

mongoose.connect('mongodb://127.0.0.1:27017/property-auction-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.listen(3000);
