const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const SECRET_KEY = process.env.SECRET_KEY || 'otherworldly place to be';

const auth = async (req, res, next) => {
  try {
    // console.log('HELLOOO');

    const token = req.header('Authorization').replace('Bearer ', '');
    console.log(token);
    const { _id } = jwt.verify(token, SECRET_KEY); //jwt package is decoding the id of the user from the token from front-end
    const user = await UserModel.findOne({ _id }); //Here, using that id, we are grabbing the user document form the DB

    // These two lines should be in /me router handler

    console.log('USER hitting Auth middleware backend!: ', user, _id);
    if (!user) {
      throw new Error();
    }
    req.user = user; //this 'user' on the right side of the equation is the user document from DB and is saved to the req object in the memory so other functions that need to access the req objects later can use it
    next();
  } catch (err) {
    res.status(401).send({ error: 'You need to authenticate yourself first' });
  }
};
module.exports = auth;
