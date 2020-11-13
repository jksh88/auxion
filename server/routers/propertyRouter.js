const express = require('express');
const PropertyModel = require('../models/propertyModel');
const router = new express.Router();
const auth = require('../middlewares/auth');

router.post('/properties/listproperty', auth, async (req, res) => {
  const property = new PropertyModel({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await property.save();
    res.status(200).send(property);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.delete('/properties/:id');

module.exports = router;
