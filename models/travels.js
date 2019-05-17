const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
  location: String,
  image: String,
  activities: String,
  food: String,
  date: Date
});

const Travels = mongoose.model('Travels', travelSchema);

module.exports = Travels;
