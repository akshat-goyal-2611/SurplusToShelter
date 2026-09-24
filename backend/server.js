console.log("RUNNING NEW SERVER.JS WITH DASHBOARD");

const dns = require("dns");

dns.setServers([
  "8.8.8.8",
  "8.8.4.4"
]);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Donation = require("./models/Donation");
const Shelter = require("./models/Shelter");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

app.get("/", (req, res) => {
  res.send("Surplus to Shelter Backend is running");
});


app.post("/api/donations", async (req, res) => {
  try {
    console.log("Received:", req.body);

    const donation = new Donation(req.body);

    const savedDonation = await donation.save();

    console.log("Saved:", savedDonation);

    res.status(201).json({
      message: "Donation posted successfully",
      donation: savedDonation
    });

  } catch (error) {
    console.log("SAVE ERROR:", error);

    res.status(500).json({
      message: "Failed to post donation"
    });
  }
});


app.get("/api/donations", async (req, res) => {
  try {

    const donations = await Donation.find();

    res.json(donations);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch donations"
    });

  }
});

app.put("/api/donations/:id/status", async (req, res) => {
  try {

    const { status } = req.body;

    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true }
    );

    res.json(donation);

  } catch (error) {

    res.status(500).json({
      message: "Failed to update status"
    });

  }
});


app.post("/api/shelters", async (req, res) => {
  try {

    const shelter = new Shelter(req.body);

    const savedShelter = await shelter.save();

    res.status(201).json({
      message: "Shelter added successfully",
      shelter: savedShelter
    });

  } catch (error) {

    console.log("Shelter save error:", error);

    res.status(500).json({
      message: "Failed to add shelter"
    });

  }
});

app.post("/api/match/:donationId", async (req, res) => {
  try {

    const donation = await Donation.findById(req.params.donationId);

    if (!donation) {
      return res.status(404).json({
        message: "Donation not found"
      });
    }

    let remainingMeals = donation.quantity;

    // Find shelters that currently need food
    const shelters = await Shelter.find({
      currentNeed: { $gt: 0 }
    });

    // Food-compatible shelters
    const suitableShelters = shelters.filter((shelter) => {
      return (
        shelter.foodPreference === "any" ||
        shelter.foodPreference === donation.foodType
      );
    });

    // Higher need first
    suitableShelters.sort(
      (a, b) => b.currentNeed - a.currentNeed
    );

    const matches = [];

    for (const shelter of suitableShelters) {

      if (remainingMeals <= 0) {
        break;
      }

      const allocatedMeals = Math.min(
        remainingMeals,
        shelter.currentNeed
      );

      matches.push({
        shelterId: shelter._id,
        shelterName: shelter.name,
        location: shelter.location,
        allocatedMeals: allocatedMeals
      });

      remainingMeals -= allocatedMeals;
      shelter.currentNeed -= allocatedMeals;

await shelter.save();

    }

  if (matches.length > 0) {

  donation.status = "matched";

  donation.matches = matches;

  await donation.save();
}

    res.json({
      donationId: donation._id,
      totalMeals: donation.quantity,
      matchedMeals: donation.quantity - remainingMeals,
      remainingMeals: remainingMeals,
      matches: matches
    });

  } catch (error) {

    console.log("Matching error:", error);

    res.status(500).json({
      message: "Matching failed"
    });

  }
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "Test route working"
  });
});

app.get("/api/dashboard", async (req, res) => {
  try {

    const totalDonations = await Donation.countDocuments();

    const deliveredDonations = await Donation.find({
      status: "delivered"
    });

    const totalDelivered = deliveredDonations.length;

    const mealsRescued = deliveredDonations.reduce(
      (sum, donation) => {
        return sum + Number(donation.quantity);
      },
      0
    );

    res.json({
      totalDonations,
      totalDelivered,
      mealsRescued
    });

  } catch (error) {

    console.log("Dashboard error:", error);

    res.status(500).json({
      message: "Failed to load dashboard"
    });
  }
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});