const mongoose = require('mongoose');
const UserModel = require('./userModel');
const { Schema } = mongoose;

const propertySchema = new Schema({
  address: { type: String, required: true },
  available: { type: Boolean, default: true },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'UserModel',
  },
  auction: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AuctionModel',
  },
});

const PropertyModel = mongoose.model('PropertyModel', propertySchema);
module.exports = PropertyModel;
