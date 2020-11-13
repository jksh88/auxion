const express = require('express');
const router = new express.Router();
const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const SECRET_KEY = process.env.SECRET_KEY || 'otherworldly place to be';
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');

router.post('/users/register', async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    res.status(409).send('User alread exists');
  }
  try {
    const hashedPW = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ ...req.body, password: hashedPW });
    const { _id } = await newUser.save();
    const token = jwt.sign({ _id }, SECRET_KEY);
    res.status(201).send({ newUser, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
});

router.post('/users/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error('Login failed');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Login failed');
    } else {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY);
      res.send(token);
    }
  } catch (err) {
    res.status(400).send();
  }
});

module.exports = router;
