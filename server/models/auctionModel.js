const mongoose = require('mongoose');
const { Schema } = mongoose;

const bidSchema = new Schema({
  bidder: {
    //current highest bidder
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'UserModel',
  },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: new Date().toISOString() },
});

const auctionSchema = new Schema({
  startPrice: { type: Number, required: true },
  currentHighestBid: {
    type: Number,
    required: true,
  },
  bids: [bidSchema],
  auctionStartTime: { type: Date, default: new Date().toISOString() },
  auctionEndTime: { type: Date },
  propertyOnSale: {
    type: Schema.Types.ObjectId,
    required: true, //IGOR: To prevent circular reference, do NOT add `ref: 'PropertyModel;'` here. It will fail.
  },
});

const AuctionModel = mongoose.model('AuctionModel', auctionSchema);
module.exports = AuctionModel;
