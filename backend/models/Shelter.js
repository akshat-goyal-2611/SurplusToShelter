const mongoose = require("mongoose");

const shelterSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  capacity: {
    type: Number,
    required: true
  },

  currentNeed: {
    type: Number,
    required: true
  },

  foodPreference: {
    type: String,
    required: true
  }

});

const Shelter = mongoose.model("Shelter", shelterSchema);

module.exports = Shelter;