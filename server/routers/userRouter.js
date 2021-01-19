const express = require('express');
const router = new express.Router();
const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const SECRET_KEY = process.env.SECRET_KEY || 'otherworldly place to be';
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');

router.post('/register', async (req, res) => {
  console.log('EMAIL FOR REGSITER IS...', req.body.email);
  const { name, email, password } = req.body;
  const user = await UserModel.findOne({ email });
  console.log('USER on BE ', user);
  if (user) {
    res.status(409).send('User alread exists');
    return;
  }
  try {
    const hashedPW = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPW });
    const { _id } = await newUser.save();
    const token = jwt.sign({ _id }, SECRET_KEY);
    const { password: passwd, ...userResponse } = newUser.toObject(); //first, need to convert the MongoDB document into an object to be able to destructure password, the constant 'password' was already used above so I now need to use a different variable name, hence: 'password: passwd'.
    res.status(201).send({ ...userResponse, token }); //Spread userResponse object so that it's not nested inside the response to front-end
  } catch (err) {
    console.log('ERROR: ', err);
    res.status(400).send(err);
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    await req.user.populate('properties').execPopulate();
    await req.user.populate('auctions').execPopulate();
    // console.log('REQ.USER.AUCTIONS: ', req.user.auctions);
    // await Promise.all(
    //   req.user.auctions.map(async (auction) => {
    //     await auction.populate('propertyOnSale').execPopulate();
    //   })
    // );
    const { password, ...userResponse } = req.user.toObject();
    const filteredResponse = {
      ...userResponse,
      auctions: userResponse.auctions.map((auction) => ({
        ...auction,
        bids: auction.bids.filter(
          (bid) => bid.bidder.toString() === req.user.id.toString()
        ),
      })),
    };
    // userResponse.auctions.bids = userResponse.auctions.bids.filter(
    //   (bid) => bid.bidder.toString() === req.user.id.toString()
    // );
    console.log('USERRES :', userResponse);

    res.send(filteredResponse);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('TEST: ', email);
  try {
    const user = await UserModel.findOne({ email }).select('password');

    if (!user) {
      throw new Error('Login failed');
    }
    console.log('USER: ', user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Login failed');
    } else {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY);
      const { password, ...userResponse } = user.toObject();

      res.send({ ...userResponse, token });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
