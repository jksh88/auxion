const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('invalid email');
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 7) {
        throw new Error('pw needs to be at least 8 characters');
      }
    },
  },
  properties: [
    {
      ref: 'PropertyModel',
      type: Schema.Types.ObjectId,
    },
  ],
});

// userSchema.virtual('properties', {
//   ref: 'PropertyModel',
//   localField: '_id',
//   foreignField: 'owner',
// });
// userSchema.pre('save', async function (next) {
//   const user = this;
//   console.log(this);
//   user.password = await bcrypt.hash(user.password, 10);

//   console.log('just before saving');
//   next();
// });

const UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;
