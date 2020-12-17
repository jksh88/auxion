const express = require('express');
const app = express();
const cors = require('cors');
const propertyRouter = require('./routers/propertyRouter');
const userRouter = require('./routers/userRouter');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const multer = require('multer');
// const upload = multer({ dest: 'public/images' });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
require('dotenv').config();

// const PropertyModel = require('./models/propertyModel');

app.use(cors());
app.use(upload.single('file', (req) => {}));
// app.use(bodyParser());
app.use(express.json());
app.use(userRouter);
app.use(propertyRouter);
app.use(express.static('public'));

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.listen(8000, () => console.log('App listening on port 8000'));

// const PropertyModel = require('./models/propertyModel');
// const UserModel = require('./models/UserModel');

// const main = async () => {
//   const property = await PropertyModel.findById('5faeb764d2a05adfbc9e7b22');
//   await property.populate('owner').execPopulate();
//   console.log(property.owner);
// };

// main();

// const sub = async () => {
//   const user = await UserModel.findById('5faeb6a4d2a05adfbc9e7b20');
//   console.log(user);
//   await user.populate('properties').execPopulate();
//   console.log(user.properties);
// };

// sub();
// const bcrypt = require('bcryptjs');

// const hashIt = async (pw) => {
//   const hpw = await bcrypt.hash(pw, 8);
//   console.log(pw);
//   console.log(hpw);
//   console.log(await bcrypt.compare(pw, hpw));
// };

// hashIt('myman2293');
