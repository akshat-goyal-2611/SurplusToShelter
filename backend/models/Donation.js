const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true
  },

  quantity: {
    type: Number,
    required: true
  },

  foodType: {
    type: String,
    required: true
  },

  expiryTime: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: "posted"
  },

  matches: [
  {
    shelterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shelter"
    },

    shelterName: String,

    location: String,

    allocatedMeals: Number
  }
],

restaurantName: {
  type: String,
  required: true
},

contactNumber: {
  type: String,
  required: true
},

});

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;