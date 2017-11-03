const Mongoose = require('mongoose');

const PollSchema = new Mongoose.Schema({
  name: { type: String, required: true },
  question: { type: String, required: true },
  choices: { type: [String], required: true },
});

module.exports = Mongoose.model('Poll', PollSchema);
