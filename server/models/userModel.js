const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('invalid email');
      }
    },
  },
  password: {
    type: String,
    required: true,
    select: false, //this prevents database from giving out password by default. To overrule this restriction, I need to use 'select('password')'.
  },
  properties: [
    //properties the owner has if the user is an owner
    {
      ref: 'PropertyModel',
      type: Schema.Types.ObjectId,
    },
  ],
  auctions: [
    //auctions the buyer is participating in if the user is a buyer
    {
      ref: 'AuctionModel',
      type: Schema.Types.ObjectId,
    },
  ],
});

const UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;
