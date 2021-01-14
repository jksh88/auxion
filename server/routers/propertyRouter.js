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
    address: JSON.parse(address),
    description: JSON.parse(description),
    images: [imageURL],
    owner: req.user.id,
  });

  const auction = new AuctionModel({
    startPrice: parseInt(JSON.parse(startPrice)),
    currentHighestBid: parseInt(JSON.parse(startPrice)),
    auctionEndTime,
    propertyOnSale: property.id,
    owner: req.user.id,
  });
  property.auction = auction.id;
  console.log('REQUEST from FE NEW: ', req.body);
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
    // await auctionProperty
    //   .populate({ path: 'owner', select: '-auctions -email' }) //No need to send auctions information or email of the owner
    //   .execPopulate();
    await auctionProperty.populate('auction').execPopulate();
    // console.log(auctionProperty.address);
    const propertyObject = auctionProperty.toObject(); //auctionProperty is a mongodb document. so, it needs to be changed into an object by 'toObject()' to be able to be used in JS enviornment and elements can be deconstructed therefrom

    res.status(200).send({
      ...propertyObject,
      auction: {
        ...propertyObject.auction,
        bids: propertyObject.auction.bids.filter(
          (bid) => bid.bidder.toString() === req.user.id.toString()
        ),
      },
    });
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
  const { purchasePrice, deposit, dueDiligence, closingDate } = req.body;
  const bid = {
    bidder,
    purchasePrice,
    deposit,
    dueDiligence,
    closingDate,
  };
  try {
    const auction = await AuctionModel.findOne({ propertyOnSale: id });
    if (auction.owner.toString() === bidder.toString()) {
      //ObjectId is an object and I need to stringify it to compare equality (In JS, obj === obj is false)
      res.status(400).send({
        message: 'Federal law prohibits self-bidding on own property',
      });
      return;
    }
    if (auction.startPrice >= purchasePrice) {
      res.status(400).send({
        message: "Your offer amount is less than seller's starting price",
      });
      return;
    }
    auction.currentHighestBid =
      auction.currentHighestBid < purchasePrice
        ? purchasePrice
        : auction.currentHighestBid;
    auction.bids.push(bid);
    await auction.save();
    // console.log('AUCTION: ', auction);
    if (!req.user.auctions.includes(auction.id)) {
      req.user.auctions.push(auction.id);
    }
    await req.user.save();
    // const auctionInfoWithBuyerBid = {
    //   ...auction,
    //   bids: bids.filter((bid) => bid.bidder.toString() === req.user.id),
    // };
    res.status(200).send({
      ...auction.toObject(),
      bids: auction.bids.filter(
        (bid) => bid.bidder.toString() === bidder.toString()
      ),
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/properties/:id/bids', auth, async (req, res) => {
  const id = req.params.id;
  const auction = await AuctionModel.findOne({ propertyOnSale: id });
  if (auction.owner.toString() === req.user.id.toString()) {
    const bidsPerBidder = new Map();
    //id's are objects and each respective value for that id is the last bid of a particular bidder
    //In real life, a particular bidder's latest bid replaces and cancels his any previous bid(s)
    auction.bids.forEach((bid) => {
      bidsPerBidder.set(bid.bidder.toString(), bid); //The Map works just like an object. Becasue object.id !=== another object.id (by reference), map treated objects with with the same id as different keys. Therefore, the original logic to rewrite the value didn't work.
    });
    res
      .status(200)
      .send({ ...auction.toObject(), bids: [...bidsPerBidder.values()] });
  }
});

router.patch('/properties/:id', auth, async (req, res) => {
  const { description, available, images } = req.body;
  const id = req.params.id;
  if (!req.user.properties.some((property) => property.id.toString() === id)) {
    res.status(401).send('Unauthorized');
    return;
  }
  if (!(description || available != null || images)) {
    res.status(400).send('Some fields missing');
    return;
  }
  const fieldsToUpdate = {};
  if (description != null) {
    fieldsToUpdate.description = description;
  }
  if (available != null) {
    fieldsToUpdate.available = available;
  }
  if (images != null) {
    fieldsToUpdate.images = images;
  }

  const property = await PropertyModel.findByIdAndUpdate(id, fieldsToUpdate, {
    new: true,
  });
  res.status(200).send(property);
});

module.exports = router;
