const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const SECRET_KEY = process.env.JWT_SECRET_PHRASE;

const auth = async (req, res, next) => {
  try {
    // console.log('HELLOOO');

    const token = req.header('Authorization').replace('Bearer ', '');
    console.log(token);
    const { _id } = jwt.verify(token, SECRET_KEY); //jwt package is decoding the id of the user from the token from front-end
    const user = await UserModel.findOne({ _id }); //Here, using that id, grab the user document from the DB

    // These two lines should be in /me router handler

    console.log(
      'token from FE hitting Auth middleware backend and auth middleware queried the USER!: ',
      user,
      _id
    );
    if (!user) {
      throw new Error();
    }
    req.user = user; //this 'user' on the right side of the equation is the user document from DB and is saved to the req object in the memory so other functions that need to access the req objects later can use it
    next();
  } catch (err) {
    res.status(401).send({ error: 'Authentication failed' });
  }
};
module.exports = auth;
