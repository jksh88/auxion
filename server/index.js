const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: { origin: 'http://localhost:3000' },
});
console.log('IO AT INDEXJS: ', io);
const cors = require('cors');
const propertyRouter = require('./routers/propertyRouter');
const userRouter = require('./routers/userRouter');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const multer = require('multer');
const { v4 } = require('uuid');

// io.on('connection', () => console.log('Connected to Websocket'));
// const upload = multer({ dest: 'public/images' });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    const [fileExtension] = file.originalname.split('.').slice(-1);
    const filename = `${v4()}.${fileExtension}`;
    // console.log('FILE: ', file);
    cb(null, filename);
    // req.body.imageURL = `http://localhost:8000/images/${filename}`;
  },
});

const upload = multer({ storage: storage });
require('dotenv').config();

// const PropertyModel = require('./models/propertyModel');

app.use(cors());
app.use(upload.array('file[]', 15)); //Since front-end used the 'file[]' fieldname, make it the consistent in backend as well. Also, use upload.array as is in multer doc
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

server.listen(8000, () => console.log('App listening on port 8000'));

module.exports = { io };
//Normally, it's not a good practice to export anything from index.js
