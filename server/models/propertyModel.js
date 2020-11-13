const mongoose = require('mongoose');
const { Schema } = mongoose;

const propertySchema = new Schema({
  address: { type: String, required: true },
  available: { type: Boolean, default: true },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const PropertyModel = mongoose.model('PropertyModel', propertySchema);
module.exports = PropertyModel;
