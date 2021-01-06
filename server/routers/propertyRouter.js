const express = require('express');
const PropertyModel = require('../models/propertyModel');
const router = new express.Router();
const auth = require('../middlewares/auth');
const UserModel = require('../models/userModel');
const AuctionModel = require('../models/auctionModel');

// const multer = require('multer');

router.post('/listproperty', auth, async (req, res) => {
  const {
    address,
    description,
    imageURL,
    startPrice,
    auctionEndTime,
  } = req.body;
  const property = new PropertyModel({
    address,
    description,
    images: [imageURL],
    owner: req.user.id,
  });

  const auction = new AuctionModel({
    startPrice,
    currentHighestBid: startPrice,
    auctionEndTime,
    propertyOnSale: property.id,
  });
  property.auction = auction.id;
  console.log('REQUEST from FE NEW: ', JSON.parse(JSON.stringify(req.body)));
  try {
    await property.save();
    await auction.save();
    req.user.properties.push(property.id);
    await req.user.save();
    await property.populate('auction').execPopulate();
    res.status(200).send(property);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});
//Here, I don't need to find user from DB because auth middleware already has found the user from DB using the token received from the front-end.
router.get('/properties', async (req, res) => {
  const properties = await PropertyModel.find({});
  try {
    res.status(200).send(properties);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/properties/:id', auth, async (req, res) => {
  const id = req.params.id; //id of the property
  try {
    const auctionProperty = await PropertyModel.findById(id); //Q: How to query an auction by property Id of its propert
    await auctionProperty
      .populate({ path: 'owner', select: '-auctions -email' }) //No need to send auctions information or email of the owner
      .execPopulate();
    await auctionProperty.populate('auction').execPopulate();
    // console.log(auctionProperty.address);
    res.status(200).send(auctionProperty);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.put('/properties/:id/bid', auth, async (req, res) => {
  //bidder will come from auth middleware(in req.user)
  //amount will come from req.body
  //in order to create a bid, i need user id, and amount(per above two lines here)
  //i need to find the auction by property id, update push(user router?) bids into bid array
  const id = req.params.id;
  const bidder = req.user.id;
  const { amount } = req.body;
  const bid = {
    bidder,
    amount,
  };
  try {
    const auction = await AuctionModel.findOne({ propertyOnSale: id });
    if (auction.currentHighestBid >= amount) {
      res
        .status(400)
        .send({ message: 'Amount is less than the current highest bid' });
      return;
    }
    auction.currentHighestBid = amount;
    auction.bids.push(bid);
    await auction.save();

    res.status(200).send(auction);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
