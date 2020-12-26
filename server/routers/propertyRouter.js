const express = require('express');
const PropertyModel = require('../models/propertyModel');
const router = new express.Router();
const auth = require('../middlewares/auth');
const UserModel = require('../models/userModel');
const AuctionModel = require('../models/auctionModel');

// const multer = require('multer');

router.post('/listproperty', auth, async (req, res) => {
  const property = new PropertyModel({
    ...req.body,
    // owner: req.user._id,
  });
  console.log('REQUEST from FE: ', req.body);
  await UserModel.findByIdAndUpdate(req.user._id, {
    $push: { properties: property._id },
  });
  try {
    await property.save();
    res.status(200).send(property);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get('/properties', async (req, res) => {
  const properties = await PropertyModel.find({});
  try {
    res.status(200).send(properties);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/property/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const auctionProperty = await PropertyModel.findById(id); //Q: How to query an auction by property Id of its propert
    console.log(auctionProperty.address);
    res.status(200).send(auctionProperty);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
