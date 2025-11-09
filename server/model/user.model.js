//
const mongoose = require("mongoose");

// schema for user signup / store user data
const userSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

//  model for userSchema
const User = mongoose.model("users", userSchema);
module.exports = User;



