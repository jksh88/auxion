const express = require('express');
const app = express();
const cors = require('cors');
const propertyRouter = require('./routers/propertyRouter');
const userRouter = require('./routers/userRouter');
const mongoose = require('mongoose');
// const PropertyModel = require('./models/propertyModel');

app.use(cors());
app.use(express.json());
app.use(userRouter);
// app.use('/api', router);

mongoose.connect('mongodb://127.0.0.1:27017/property-auction-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.listen(3000, () => console.log('App listening on port 3000'));

// const bcrypt = require('bcryptjs');

// const hashIt = async (pw) => {
//   const hpw = await bcrypt.hash(pw, 8);
//   console.log(pw);
//   console.log(hpw);
//   console.log(await bcrypt.compare(pw, hpw));
// };

// hashIt('myman2293');
