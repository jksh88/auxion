const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const SECRET_KEY = process.env.SECRET_KEY || 'otherworldly place to be';

const auth = async (req, res, next) => {
  try {
    // console.log('HELLOOO');

    const token = req.header('Authorization').replace('Bearer ', '');
    console.log(token);
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await UserModel.findOne({ _id });

    await user.populate('properties').execPopulate();
    console.log('USER hitting Auth middleware backend!: ', user, _id);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: 'You need to authenticate yourself first' });
  }
};
module.exports = auth;
