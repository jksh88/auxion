const mongoose = require('mongoose');
const UserModel = require('./userModel');
const { Schema } = mongoose;

const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
});

const propertySchema = new Schema({
  address: { type: addressSchema, required: true },
  description: { type: String, required: true },
  available: { type: Boolean, default: true },
  images: { type: [String] }, //array of images: first image is the featured image, the rest upon user clicking into a particular property address
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'UserModel',
  },
  auction: {
    type: Schema.Types.ObjectId,
    ref: 'AuctionModel',
  },
});

const PropertyModel = mongoose.model('PropertyModel', propertySchema);
module.exports = PropertyModel;
