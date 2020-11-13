const { Model, Schema } = require('mongoose');

const auctionSchema = new Schema({
  starting_price: { type: Number, required: true },
  bid_increment: { type: Number, required: true },
  current_highest_bid: { type: Number, required: true },
  bidder: { type: { bidder_id: String, bidder_last_name: String } },
  bid_id: { type: String },
  date_listed: { type: Date, default: Date.now, required: true },
  auction_start_time: { type: Date },
  auction_end_time: { type: Date },
});

const AuctionModel = Model('AuctionModel', auctionSchema);
module.exports = AuctionModel;
