const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CafeSchema = new Schema ({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  coffee: String
})

module.exports = mongoose.model('Cafe', CafeSchema,'cafes');