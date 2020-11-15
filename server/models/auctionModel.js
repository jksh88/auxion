const { Model, Schema } = require('mongoose');

const auctionSchema = new Schema({
  startPrice: { type: Number, required: true },
  currentHighestBid: {
    type: Number,
    required: true,
    bidder: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'UserModel',
    },
  },
  auctionStartTime: { type: Date, default: Date.now },
  auctionEndTime: { type: Date },
  propertyOnSale: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'PropertyModel',
  },
});

const AuctionModel = Model('AuctionModel', auctionSchema);
module.exports = AuctionModel;
