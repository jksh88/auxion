const mongoose = require('mongoose');
const { Schema } = mongoose;

const propertySchema = new Schema({
  address: { type: String, required: true },
  parcel_number: { type: String, required: true },
  starting_price: { type: Number, required: true },
  bid_increment: { type: Number, required: true },

  current_highest_bid: { type: Number, required: true },
  bidder: { type: { bidder_id: String, bidder_last_name: String } },
  available: { type: Boolean },
  bid_id: { type: String },
  date_posted: { type: Date, default: Date.now, required: true },
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
