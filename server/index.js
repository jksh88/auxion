require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { app, server } = require('./server');
const upload = require('./multer');
const propertyRouter = require('./routers/propertyRouter');
const userRouter = require('./routers/userRouter');
// const herokuCaffeine = require('./caffeine');

app.use(cors());
app.use(upload.array('file[]', 15)); //Since front-end used the 'file[]' fieldname, make it the consistent in backend as well. Also, use upload.array as is in multer doc
app.use(express.json());
app.use(userRouter);
app.use(propertyRouter);
app.use(express.static('public'));

// herokuCaffeine.run();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

server.listen(process.env.PORT || 8000, () =>
  console.log('Server listening now..')
);

//Index.js cannot export anything to any other file because it is the root.
