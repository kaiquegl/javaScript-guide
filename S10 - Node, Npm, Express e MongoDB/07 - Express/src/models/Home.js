const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
  title: String,
  description: { type: String, required: true },
});

const HomeModel = mongoose.model("Home", HomeSchema);

class Home {}

module.exports = Home;

// module.exports = HomeModel;
