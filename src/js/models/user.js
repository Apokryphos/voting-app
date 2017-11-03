const Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = Mongoose.model('User', UserSchema);
