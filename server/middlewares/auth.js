const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const SECRET_KEY = process.env.SECRET_KEY || 'otherworldly place to be';

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = UserModel.findOne({ _id });
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
