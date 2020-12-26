const mongoose = require('mongoose');
const { Schema } = mongoose;

const auctionSchema = new Schema({
  startPrice: { type: Number, required: true },
  currentHighestBid: {
    type: Number,
    required: true,
  },
  bidder: {
    //current highest bidder
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'UserModel',
  },
  auctionStartTime: { type: Date, default: Date.now },
  auctionEndTime: { type: Date },
  propertyOnSale: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'PropertyModel',
  },
});

const AuctionModel = mongoose.model('AuctionModel', auctionSchema);
module.exports = AuctionModel;
