const Mongoose = require('mongoose');

const ChoiceSchema = new Mongoose.Schema({
  text: { type: String, required: true },
  votes: { type: [Mongoose.ObjectID], default: [] },
});

const PollSchema = new Mongoose.Schema({
  createdBy: { type: String, required: true },
  question: { type: String, required: true },
  choices: { type: [ChoiceSchema], required: true },
});

module.exports = Mongoose.model('Poll', PollSchema);
