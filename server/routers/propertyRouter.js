const express = require('express');
const PropertyModel = require('../models/propertyModel');
const router = new express.Router();
const auth = require('../middlewares/auth');
const UserModel = require('../models/userModel');

router.post('/properties/listproperty', auth, async (req, res) => {
  const property = new PropertyModel({
    ...req.body,
    owner: req.user._id,
  });
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

module.exports = router;
