const express = require('express');
const PropertyModel = require('../models/propertyModel');
const router = new express.Router();
const auth = require('../middlewares/auth');
const UserModel = require('../models/userModel');
const AuctionModel = require('../models/auctionModel');
const { io } = require('../server');
// console.log('WHAT IS IO: ', io);

router.post('/listproperty', auth, async (req, res) => {
  const { address, description, startPrice, auctionEndTime } = req.body;
  const property = new PropertyModel({
    address: JSON.parse(address),
    description: JSON.parse(description),
    images: req.files.map(
      (file) => `http://localhost:8000/images/${file.filename}`
    ), //req.files is an array of objects. I need array of strings with strings being the names of the files
    owner: req.user.id,
  });
  // console.log('REQ.FILES: ', req.files);
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
          (bid) =>
            bid.bidder.toString() === req.user.id.toString() ||
            auctionProperty.owner.toString() === req.user.id.toString()
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

    //I am finding the index of the bidder in the bids array of the auction in the property(see property schema).
    const idx = auction.bids.findIndex(
      (bid) => bid.bidder.toString() === bidder.toString()
    );
    // console.log('IDX: ', idx);
    //If index is not found, that means the bidder never placed a bid before for this property.
    //Therefore, I am pushing his bid into the bids array.
    //I check if the bidder has bidden for this property before, because I only keep (last) one bid from each bidder for this property.
    //Only the last bid from a particular bidder is kept and others discarded.
    if (idx === -1) {
      auction.bids.push(bid);
    } else {
      auction.bids[idx] = bid;
    }

    //After the bid is updated, I can find the maximum bid.
    auction.currentHighestBid = auction.bids.reduce(
      (acc, cur) => (cur.purchasePrice > acc ? cur.purchasePrice : acc),
      0
    );

    //TODO: replace push with set from auction.{set:}
    //If there is no bid currently for the user, I need to create one, but if there is one already, I need to replace it witht the new bid
    //if (auction.bids.findIndexOf() === -1)
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
    const userOwnBids = {
      ...auction.toObject(),
      bids: auction.bids.filter(
        (bid) => bid.bidder.toString() === bidder.toString()
      ),
    };
    // io.on('connection', (socket) => {
    //   socket.emit('bid', JSON.stringify(userOwnBids));

    // });
    io.sockets.emit('bid', JSON.stringify(userOwnBids));
    res.status(200).send(userOwnBids); //This is so that backend only sends bids that pertain to the particular user and he can't see other people's bids
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/properties/:id/bids', auth, async (req, res) => {
  const id = req.params.id;
  const auction = await AuctionModel.findOne({ propertyOnSale: id });
  if (auction.owner.toString() === req.user.id.toString()) {
    // const bidsPerBidder = new Map();
    //id's are objects and each respective value for that id is the last bid of a particular bidder
    //In real life, a particular bidder's latest bid replaces and cancels his any previous bid(s)
    // auction.bids.forEach((bid) => {
    //   bidsPerBidder.set(bid.bidder.toString(), bid); //The Map works just like an object. Becasue object.id !=== another object.id (by reference), map treated objects with with the same id as different keys. Therefore, the original logic to rewrite the value didn't work.
    // });
    res.status(200).send(auction);
    // .send({ ...auction.toObject(), bids: [...bidsPerBidder.values()] });
  }
});

router.patch('/properties/:id/edit', auth, async (req, res) => {
  const { description, available, images, auctionEndTime } = req.body;
  const id = req.params.id;
  if (!req.user.properties.some((property) => property._id.toString() === id)) {
    console.log('REQ.USER**: ', req.user);
    //TODO: this user came from auth middleware right?
    //TODO: How was poperties populated for user without manually populating?
    //TODO: Why is password not shown on backend terminal?

    //TDODO: Forgot. Why use some again??
    //TODO: Is it not property._id? Update: I changed it to _id and now it works. How did it work before when we tested with just id?

    console.log('ID** at EDIT ROUTER: ', id);
    res.status(401).send('Unauthorized');
    return;
  }
  if (!(description || available != null || images || auctionEndTime)) {
    res.status(400).send('Some fields missing');
    return;
  }
  const propertyFieldsToUpdate = {};
  const auctionFieldsToUpdate = {};
  if (description != null) {
    propertyFieldsToUpdate.description = JSON.parse(description);
    //I need to wrap the front end string data in JSON.parse because the data comes in formData. FormData natively works with browsers, which means if I use form inside a broswer, this form by default will try to send form data. When I didn't do the JSON.parse like this on the backend, prepopulated data in edit forms on front end were escaped with backslash.
  }
  if (available != null) {
    propertyFieldsToUpdate.available = JSON.parse(available);
  }
  if (images != null) {
    propertyFieldsToUpdate.images = images;
  }
  if (auctionEndTime != null) {
    auctionFieldsToUpdate.auctionEndTime = auctionEndTime;
  }

  const property = await PropertyModel.findByIdAndUpdate(
    id,
    propertyFieldsToUpdate,
    {
      new: true,
    }
  );

  const auctionId = property.auction.toString();
  console.log('AUCTIONID: ', auctionId);
  const auction = await AuctionModel.findByIdAndUpdate(
    auctionId,
    auctionFieldsToUpdate,
    {
      new: true,
    }
  );
  res.status(200).send(property);
});

module.exports = router;
